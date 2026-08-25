import { Schema, Document, model, models } from "mongoose";

export interface ICategory extends Document {
    name: string;
    slug: string;
    parentId?: Schema.Types.ObjectId | null;
    icon?: string | null;
}

const schema = new Schema<ICategory>(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        slug: {
            type: String,
            trim: true,
            required: true,  
            lowercase: true,
        },
        parentId: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            default: null,
        },
        icon: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

schema.index({ parentId: 1 });

const CategoryModel = models.Category || model<ICategory>("Category", schema);
export default CategoryModel;