import { Request, Response } from 'express';

import { Product } from '../../models';
import { validateBodyProductCreate } from '../model/Product/CreateProduct';
import { validateParamsProduct } from '../model/Product/FindOneProduct';
import { validateBodyProductUpdate } from '../model/Product/UpdateProduct';
import { ProductService } from '../services/ProductService';
class ProductController {
  static async create(req: Request, res: Response) {
    try {
      const { description, image, priceForCents, title } =
        validateBodyProductCreate.parse(req.body);
      await Product.create({
        description,
        image,
        priceForCents,
        title
      });
      return res.status(201).json({
        message: 'Product created successfully'
      });
    } catch (error) {
      res.status(400).json({
        message: error
      });
    }
  }
  static async findAll(req: Request, res: Response) {
    try {
      const products =
        await ProductService.findAllProduct();
      if (products instanceof Error)
        return res.json({
          message: products.message
        });
      return res.json(products);
    } catch (error) {
      res.status(400).json({
        message: error
      });
    }
  }
  static async findOne(req: Request, res: Response) {
    try {
      const { id } = validateParamsProduct.parse(
        req.params
      );
      const product = await ProductService.finOneProduct({
        id
      });
      if (product instanceof Error)
        return res.status(400).json({
          message: product.message
        });
      return res.status(200).json(product);
    } catch (error) {
      res.status(400).json({
        message: error
      });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const { id } = validateParamsProduct.parse(
        req.params
      );
      const { description, image, priceForCents, title } =
        validateBodyProductUpdate.parse(req.body);
      const userUpdated =
        await ProductService.updateProduct({
          description,
          id,
          image,
          priceForCents,
          title
        });
      if (userUpdated instanceof Error)
        return res.status(400).json({
          message: userUpdated.message
        });
      return res.status(200).json({
        message: 'Product updated successfully'
      });
    } catch (error) {
      res.status(400).json({
        message: error
      });
    }
  }
  static async delete(req: Request, res: Response) {
    try {
      const { id } = validateParamsProduct.parse(
        req.params
      );
      const productDeleted =
        await ProductService.deleteProduct({
          id
        });
      if (productDeleted instanceof Error)
        return res.status(400).json({
          message: productDeleted.message
        });
      return res.status(200).json({
        message: 'Product deleted successfully'
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: error
      });
    }
  }
}

export { ProductController };
