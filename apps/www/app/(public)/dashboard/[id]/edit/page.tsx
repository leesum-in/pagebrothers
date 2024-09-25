import VideoWidget from '@/widget/video/VideoWidget';

function EditPage(): React.ReactNode {
  return (
    <>
      <div className="desktop:flex-1">
        <div className="mx-auto w-full max-w-[26rem]">
          <div className="space-y-6">
            <VideoWidget />
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[26rem] desktop:max-w-[22.5rem] desktop:flex-none desktop:self-start sticky top-[5.5rem] hidden desktop:block" />
    </>
  );
}

export default EditPage;
