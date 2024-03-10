import { Drawer } from 'vaul';

export const ExperienceBlockEditor = () => {
  return (
    <Drawer.Root shouldScaleBackground direction="right">
      <Drawer.Trigger asChild>
        <button>Open Drawer</button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-white flex flex-col rounded h-full w-[400px] mt-24 fixed bottom-0 right-0">
          <div className="p-4 bg-white flex-1 h-full">
            {/* <div className="max-w-md mx-auto">
              <p className="text-zinc-600 mb-8">
                It uses{' '}
                <a
                  href="https://www.radix-ui.com/docs/primitives/components/dialog"
                  className="underline"
                  target="_blank"
                >
                  Radix&rsquo;s Dialog primitive
                </a>{' '}
                under the hood and is inspired by{' '}
                <a
                  href="https://twitter.com/devongovett/status/1674470185783402496"
                  className="underline"
                  target="_blank"
                >
                  this tweet.
                </a>
              </p>
            </div> */}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
