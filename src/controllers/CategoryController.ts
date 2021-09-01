import { Request, Response } from "express";
import Category from "../models/Category";

export class CategoryController {

    public async getCategories(req: Request, res: Response): Promise<void> {
        const list = await Category.find();
        res.json({ list });
    }

    public async getCategoryById(req: Request, res: Response): Promise<void> {
        const category = await Category.findOne({ _id: req.params.categoryId });
        if (category === null) {
            res.sendStatus(404);
        } else {
            res.json(category);
        }
    }

    public async updateCategory(req: Request, res: Response): Promise<void> {
        const category = await Category.findOneAndUpdate({ _id: req.params.categoryId }, req.body);
        if (category === null) {
            res.sendStatus(404);
        } else {
            const updateCategory = { _id: req.params.categoryId, ...req.body };
            res.json({ status: res.status, data: updateCategory });
        }
    }

    public async createCategory(req: Request, res: Response): Promise<void> {
        const newCategory: any = new Category(req.body);
        const category = await Category.findOne({ _id: req.body.categoryId });
        if (category === null) {
            const result = await newCategory.save();
            if (result === null) {
                res.sendStatus(500);
            } else {
                res.status(201).json({ status: 201, data: result });
            }

        } else {
            res.json("Category exited");
        }
    }

    public async removeUser(req: Request, res: Response): Promise<void> {
        const category = await Category.findOne({ _id: req.params.categoryId });
        if (category === null) {
            res.sendStatus(404);
        } else {
            category.deleted = 'Y'
            await category.save()
            res.json({ response: "User deleted Successfully" });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        const category = await Category.findOneAndDelete({ _id: req.params.categoryId });
        if (category === null) {
            res.sendStatus(404);
        } else {
            res.json({ response: "User deleted Successfully" });
        }
    }
}