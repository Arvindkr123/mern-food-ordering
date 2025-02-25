import { Request, Response } from "express";
import RestaurantModels from "../models/restaurant.models";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

const createMyRestaruant = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.body);
  try {
    const existingRestaurant = await RestaurantModels.findOne({
      user: req.userId,
    });

    //console.log(existingRestaurant);

    if (existingRestaurant) {
      res.status(409).json({
        message: "user restaurant already exists",
      });
      return;
    }

    const image = req.file as Express.Multer.File;

    const base64Image = Buffer.from(image.buffer).toString("base64");

    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.uploader.upload(dataURI);

    const restaurant = new RestaurantModels(req.body);

    restaurant.imageUrl = uploadResponse.url;

    restaurant.user = new mongoose.Types.ObjectId(req.userId.toString());

    await restaurant.save();
    res.status(201).send(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const updateMyRestaruant = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.body);
  try {
    const restaurant = await RestaurantModels.findOne({
      user: req.userId,
    });

    // console.log(restaurant);

    if (!restaurant) {
      res.status(409).json({
        message: "restaurant not found",
      });
      return;
    }

    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    restaurant.lastUpdated = new Date();

    if (req.file) {
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      restaurant.imageUrl = imageUrl;
    }
    await restaurant.save();
    res.status(201).send(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getMyRestaruant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const restaurant = await RestaurantModels.findOne({ user: req.userId });
    if (!restaurant) {
      res.status(404).json({
        message: "restaurant not found",
      });
      return;
    }

    res.json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;

  const base64Image = Buffer.from(image.buffer).toString("base64");

  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.uploader.upload(dataURI);
  // console.log(uploadResponse.url);

  return uploadResponse.url;
};

const searchRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const city = req.params.city;

    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";

    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};

    query["city"] = new RegExp(city, "i");

    const cityCheck = await RestaurantModels.countDocuments(query);

    if (cityCheck === 0) {
      res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
      return;
    }

    if (selectedCuisines) {
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      query["cuisines"] = {
        $all: cuisinesArray,
      };
    }

    if (searchQuery) {
      const searchRegx = new RegExp(searchQuery, "i");
      query["$or"] = [
        {
          restaurantName: searchRegx,
        },
        {
          cuisines: { $in: [searchRegx] },
        },
      ];
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const restaurants = await RestaurantModels.find(query)
      .sort({
        [sortOption]: 1,
      })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await RestaurantModels.countDocuments(query);

    const response = {
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export default {
  createMyRestaruant,
  getMyRestaruant,
  updateMyRestaruant,
  searchRestaurant,
};
