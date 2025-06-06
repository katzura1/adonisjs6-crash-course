import vine from '@vinejs/vine'

export const PostValidator = vine.compile(
  vine.object({
    content: vine.string().maxLength(10000),
  })
)
