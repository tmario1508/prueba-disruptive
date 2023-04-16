import Category from "../models/Category";

export default class CategoryService {
    public async createCategory(payload: CreateOrUpdateCategoryRequest): Promise<Category> {
        // Create category.
        const category = await Category.create({
            name: payload.name,
            description: payload.description,
            image: payload.image,
        });

        return category.rest();
    }

    public async updateCategory(id: string, payload: CreateOrUpdateCategoryRequest) {
        const category = await Category.findByPk(id);
        // Update category.
        category!.update({ 
            name: payload.name,
            description: payload.description,
            image: payload.image,
        })

        return category.rest();
    }

    public async deleteCategory(id: string) {
        const category = await Category.findByPk(id);
        // Delete category.
        await category.destroy();

        return { message: 'Category deleted' }
    }

    public async getCategory(id: string): Promise<Category | null> {
        const category = await Category.findByPk(id);

        return await category.rest();
    }

    public async getCategories(): Promise<Category[] | null> {
        const categories = await Category.findAll();

        return await Promise.all(categories.map(async (category: Category) => category.rest()));
    }
}