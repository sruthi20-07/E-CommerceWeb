const statusSteps = ['Placed', 'Processing', 'Delivered']

function OrderStatusTracker({ status = 'Placed' }) {
  const currentStepIndex = Math.max(statusSteps.indexOf(status), 0)

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2">
        {statusSteps.map((step, index) => {
          const isActive = index <= currentStepIndex
          return (
            <div key={step} className="flex flex-1 items-center gap-2">
              <div
                className={`h-2 w-full rounded-full transition ${
                  isActive ? 'bg-brand-600' : 'bg-stone-200'
                }`}
              />
              {index !== statusSteps.length - 1 ? null : null}
            </div>
          )
        })}
      </div>
      <div className="mt-2 grid grid-cols-3 text-xs uppercase tracking-[0.12em]">
        {statusSteps.map((step, index) => (
          <span
            key={step}
            className={index <= currentStepIndex ? 'font-medium text-stone-900' : 'text-stone-400'}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  )
}

export default OrderStatusTracker
