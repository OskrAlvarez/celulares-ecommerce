import { featureInfo } from "@/common/constants/features";

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 gap-8 mt-6 mb-16 lg:grid-cols-4 lg:gap-5">
      {featureInfo.map(({ icon, id, shortDescription, title }) => (
        <div key={id} className="flex items-center gap-6">
          {icon}
          <div className='space-y-1'>
            <p className='font-semibold'>{title}</p>
            <p className='text-sm'>{shortDescription}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
