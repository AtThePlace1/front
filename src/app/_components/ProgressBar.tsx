import classNames from 'classnames';

interface ProgressBarProps {
  currentStep: number;
  handleStepClick: (step: number) => void;
}

export default function ProgressBar({
  currentStep,
  handleStepClick,
}: ProgressBarProps) {
  const progressEl = [
    { id: 1, title: '반려동물' },
    { id: 2, title: '단체석' },
    { id: 3, title: '테라스' },
    { id: 4, title: '디카페인' },
  ];

  return (
    <div className="w-full">
      <ul className="flex items-center justify-between">
        {progressEl.map((el, index) => (
          <li
            key={el.id}
            className={classNames('relative flex flex-col items-center gap-1', {
              'hover:cursor-pointer': currentStep >= el.id,
              '': currentStep < el.id,
            })}
            onClick={() => handleStepClick(el.id)}
          >
            <div
              className={classNames(
                'flexCenter relative z-10 h-8 w-8 rounded-full transition-colors duration-300 desktop:h-14 desktop:w-14',
                {
                  'bg-orange-500 text-white': currentStep >= el.id,
                  'bg-slate-400 text-black': currentStep < el.id,
                }
              )}
            >
              {el.id}
            </div>
            {index < progressEl.length - 1 && (
              <div
                className={classNames(
                  'absolute left-30pxr top-11pxr h-3 w-70pxr transition-all duration-500 desktop:top-14pxr desktop:h-7 desktop:w-130pxr',
                  {
                    'bg-orange-500': currentStep > el.id,
                    'bg-slate-400': currentStep <= el.id,
                  }
                )}
              ></div>
            )}
            <div
              className={classNames('text-sm desktop:text-lg', {
                'font-extrabold text-orange-600': currentStep >= el.id,
                'text-gray-400': currentStep < el.id,
              })}
            >
              {el.title}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
