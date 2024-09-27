import { Request, Response } from "express";
import { z, ZodError } from "zod";
import { HTTP_CODES } from "../constant";
import {
  createNewItem,
  deleteItemById,
  getAllItems,
  getItemRowById,
  updateItemLocation,
} from "../services";

export const createItem = async (req: Request, res: Response) => {
  try {
    const createItemParamSchema = z.object({
      location_id: z.string(),
    });
    const { location_id } = createItemParamSchema.parse(req.params);
    const createItemBodySchema = z.object({
      name: z.string(),
      type: z.string(),
      length: z.number(),
      width: z.number(),
      height: z.number(),
    });
    const reqBody = createItemBodySchema.parse(req.body);

    const result = await createNewItem(Number(location_id), reqBody);

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
        .json({ message: "Error creating items", errors: err });
      return;
    }
  }
};

//get item list
export const getItems = async (req: Request, res: Response) => {
  try {
    const result = await getAllItems();
    res.status(HTTP_CODES.OK).json(result);
    return;
  } catch (err) {
    res
      .status(HTTP_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "Error retriving items", errors: err });
    return;
  }
};

export const getItemById = async (req: Request, res: Response) => {
  try {
    const getItemParamSchema = z.object({
      item_id: z.string(),
    });

    const { item_id } = getItemParamSchema.parse(req.params);
    const result = await getItemRowById(Number(item_id));
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
        .json({ message: "Error retriving item", errors: err });
      return;
    }
  }
};

export const changeItemLocation = async (req: Request, res: Response) => {
  try {
    const changeItemLocationParamSchema = z.object({
      item_id: z.string(),
      location_id: z.string(),
    });

    const { item_id, location_id } = changeItemLocationParamSchema.parse(
      req.params
    );

    const result = await updateItemLocation(
      Number(item_id),
      Number(location_id)
    );
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
        .json({ message: "Error changing item's location", errors: err });
      return;
    }
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const deleteItemParamSchema = z.object({
      item_id: z.string(),
    });
    const { item_id } = deleteItemParamSchema.parse(req.params);
    await deleteItemById(Number(item_id));
    res.status(HTTP_CODES.OK).json("Item deleted");
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
        .json({ message: "Error deleting item", errors: err });
      return;
    }
  }
};
