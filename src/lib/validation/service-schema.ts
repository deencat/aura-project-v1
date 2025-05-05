import { z } from 'zod';

export const ServiceSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters').max(100, 'Slug must be less than 100 characters'),
  category: z.string().min(2, 'Category must be at least 2 characters'),
  price: z.string(),
  duration: z.string(),
  status: z.enum(['Active', 'Draft']),
  short_description: z.string().optional(),
  long_description: z.string().optional(),
  benefits: z.string().optional(),
  suitable_for: z.string().optional(),
  contraindications: z.string().optional(),
  preparation: z.string().optional(),
  aftercare: z.string().optional(),
  section_images: z.any().optional(),
  template: z.string().optional(),
});

export const ServiceUpdateSchema = ServiceSchema.partial();

export type ServiceInput = z.infer<typeof ServiceSchema>;
export type ServiceUpdateInput = z.infer<typeof ServiceUpdateSchema>; 