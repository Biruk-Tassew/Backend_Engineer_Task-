import { Request, Response, NextFunction } from "express";
import { UserRole } from "../models/user.model"; // Assuming your UserRole enum is here
import AdGraphicModel from "../models/adGraphic.model";
import AdModel from "../models/ad.model";
import AdAttributeModel from "../models/adAttributes.model";

type Permission = {
  resource: string;
  roles: UserRole[];
  ownershipCheck?: boolean; // If true, check if the user owns the resource
};

// Define permissions for each resource
const permissions: Permission[] = [
  // User model permissions
  { resource: "User", roles: [UserRole.ADMIN] },

  // AdGraphics model permissions
  { resource: "AdGraphics", roles: [UserRole.ADMIN, UserRole.MODERATOR, UserRole.ANALYTICS, UserRole.SUPPORT, UserRole.ADVERTISER] },
  { resource: "AdGraphics:own", roles: [UserRole.ADVERTISER], ownershipCheck: true },

  // Ad model permissions
  { resource: "Ad", roles: [UserRole.ADMIN, UserRole.MODERATOR, UserRole.ANALYTICS, UserRole.SUPPORT, UserRole.ADVERTISER] }, 
  { resource: "Ad:own", roles: [UserRole.ADMIN, UserRole.MODERATOR, UserRole.ANALYTICS, UserRole.SUPPORT, UserRole.ADVERTISER], ownershipCheck: true },

  // AdAttribute model permissions
  { resource: "AdAttribute", roles: [UserRole.ADMIN, UserRole.MODERATOR, UserRole.ANALYTICS, UserRole.SUPPORT, UserRole.ADVERTISER] }, 
  { resource: "AdAttribute:own", roles: [UserRole.ADMIN, UserRole.MODERATOR, UserRole.ANALYTICS, UserRole.SUPPORT, UserRole.ADVERTISER], ownershipCheck: true },
];

// Middleware to check permissions
function authorize(resource: string, action: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = res.locals.user.role;
    const userId = res.locals.user._id;
    const resourceId = req.params.id || req.body.adId; // Adjust according to your routing logic

    // Find the permission rule
    const permission = permissions.find(
      (perm) => perm.resource === `${resource}:${action}` || perm.resource === resource
    );
    if (!permission) {
      return res.status(403).send("Access denied. No permission configuration found.");
    }

    // Check if the user's role is allowed
    if (!permission.roles.includes(userRole)) {
      return res.status(403).send("Access denied. Role not authorized.");
    }

    // If ownership check is required, verify the user owns the resource
    if (permission.ownershipCheck && action !== 'create') {
      verifyOwnership(resource, resourceId, userId)
        .then((ownsResource) => {
          if (!ownsResource) {
            return res.status(403).send("Access denied. Not the resource owner.");
          }
          next();
        })
        .catch((err) => {
          console.error("Error verifying ownership:", err);
          return res.status(500).send("Internal server error.");
        });
    } else {
      next();
    }
  };
}

// Helper function to verify ownership
async function verifyOwnership(resource: string, resourceId: string, userId: string): Promise<boolean> {
  // Implement ownership check logic
  switch (resource) {
    case "AdGraphics": {
      const adGraphic = await AdGraphicModel.findById(resourceId);
      return adGraphic !== null && adGraphic.userId === userId;
    }

    case "Ad": {
      const ad = await AdModel.findById(resourceId);
      return ad !== null && ad.user === userId;
    }

    case "AdAttribute": {
      const adAttribute = await AdAttributeModel.findById(resourceId);
      const ad = await AdModel.findById(adAttribute?.adId);
      return adAttribute !== null && ad !== null && ad.user === userId;
    }

    default:
      return false;
  }
}

export default authorize;
