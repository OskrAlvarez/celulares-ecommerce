type TagType = 'Nuevo' | 'Agotado'

interface Props {
  contentTag: TagType
}

const getTagColor = (content: TagType) => {
  const lowerContent = content.toLocaleLowerCase()
  if(lowerContent === 'nuevo') return 'bg-green-500'
  if(lowerContent === 'agotado') return 'bg-red-500'

  return 'bg-gray-500'
}

export function Tag({ contentTag }: Props) {
  return (
    <div className={`text-white w-fit px-2 ${getTagColor(contentTag)} rounded-2xl py-1`}>
      <p className="uppercase text-xs font-medium">
        {contentTag}
      </p>
    </div>
  )
}
