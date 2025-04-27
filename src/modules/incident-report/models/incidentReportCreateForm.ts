import { z } from 'zod'

export const incidentReportCreateForm = z.object({
  createdDate: z.date(),
  createdTime: z.string().min(1),
  causes: z.string().array().min(1),
  description: z.string().min(1),
  images: z.instanceof(File).array().min(1),
  location: z.string().min(1),
  otherCause: z.string().nullable(),
  responsible: z.string().nullable(),
  urgency: z.string(),
})

export type IncidentReportCreateForm = z.infer<typeof incidentReportCreateForm>
