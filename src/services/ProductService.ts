import { Product } from '../../models';
interface IFindOneProduct {
  id: string;
}
interface IUpdateProduct {
  id: string;
  description: string;
  image: string;
  priceForCents: number;
  title: string;
}
type IDeleteProduct = IFindOneProduct;
export class ProductService {
  static async findAllProduct() {
    const products = await Product.findAll();
    if (products.length === 0)
      return new Error('No product found');
    return products;
  }
  static async finOneProduct({ id }: IFindOneProduct) {
    const product = await Product.findByPk(id);
    if (!product) return new Error('No product found');
    return product;
  }
  static async updateProduct({
    description,
    id,
    image,
    priceForCents,
    title
  }: Partial<IUpdateProduct>) {
    const product = await Product.update(
      {
        description,
        image,
        priceForCents,
        title
      },
      {
        where: {
          id
        }
      }
    );
    if (product[0] === 0)
      return new Error(
        'No product found for update or Data is the same'
      );
    return product;
  }
  static async deleteProduct({ id }: IDeleteProduct) {
    const productDeleted = await Product.destroy({
      where: {
        id
      }
    });
    if (productDeleted === 0)
      return new Error('No product found for delete');
    return productDeleted;
  }
}
