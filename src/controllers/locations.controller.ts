import { Request, Response } from "express";
import { z, ZodError } from "zod";
import { HTTP_CODES } from "../constant";
import {
  createNewLocation,
  deleteLocationById,
  getAllLocations,
  getLocationRowById,
  updateLocationNameById,
} from "../services";

// create
export const createLocation = async (req: Request, res: Response) => {
  try {
    const createLocationSchema = z.object({
      name: z.string(),
      coordinate: z
        .array(z.array(z.number()))
        .length(4, { message: "needs to be exactly 4" })
        .nonempty(),
    });

    const reqBody = createLocationSchema.parse(req.body);

    const result = await createNewLocation(reqBody);

    res.status(HTTP_CODES.CREATED).json(result);
    return;
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(HTTP_CODES.BAD_REQUEST).json({
        status: "error",
        message: "Validation error",
        errors: err.errors,
      });
      return;
    } else {
      res
        .status(HTTP_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: "Error creating locations", errors: err });
      return;
    }
  }
};

// get all locations
export const getLocations = async (req: Request, res: Response) => {
  try {
    const result = await getAllLocations();
    res.status(HTTP_CODES.OK).json(result);
    return;
  } catch (err) {
    res
      .status(HTTP_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "Error retriving locations", errors: err });
    return;
  }
};

// get location by id
export const getLocationById = async (req: Request, res: Response) => {
  try {
    const getLocationByIdSchema = z.object({
      location_id: z.string(),
    });
    const { location_id } = getLocationByIdSchema.parse(req.params);
    const result = await getLocationRowById(Number(location_id));

    res.status(HTTP_CODES.OK).send(result);
    return;
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(HTTP_CODES.BAD_REQUEST).json({
        status: "error",
        message: "Validation error",
        errors: err.errors,
      });
      return;
    } else {
      res
        .status(HTTP_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: "Error creating locations", errors: err });
      return;
    }
  }
};

// update location by id
export const updateLocationName = async (req: Request, res: Response) => {
  try {
    const updateLocationParamSchema = z.object({
      location_id: z.string(),
    });
    const { location_id } = updateLocationParamSchema.parse(req.params);

    const updateLocationSchema = z.object({
      name: z.string(),
    });
    const { name } = updateLocationSchema.parse(req.body);
    const result = await updateLocationNameById(Number(location_id), name);

    res.status(HTTP_CODES.OK).json(result);
    return;
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(HTTP_CODES.BAD_REQUEST).json({
        status: "error",
        message: "Validation error",
        errors: err.errors,
      });
      return;
    } else {
      res
        .status(HTTP_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: "Error updating locations", errors: err });
      return;
    }
  }
};

// delete location by id
export const deleteLocation = async (req: Request, res: Response) => {
  try {
    const deleteLocationParamSchema = z.object({
      location_id: z.string(),
    });
    const { location_id } = deleteLocationParamSchema.parse(req.params);
    await deleteLocationById(Number(location_id));
    res.status(HTTP_CODES.OK).json("Location deleted");
    return;
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(HTTP_CODES.BAD_REQUEST).json({
        status: "error",
        message: "Validation error",
        errors: err.errors,
      });
      return;
    } else {
      res
        .status(HTTP_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: "Error deleting locations", errors: err });
      return;
    }
  }
};
