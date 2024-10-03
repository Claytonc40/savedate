import Image from 'next/image';

const Video = () => {
  return (
    <div hidden className="fixed inset-0 w-6/12 lg:block">
      <span className="absolute bottom-6 left-6 z-10 text-sm text-white">
        ©{new Date().getFullYear()} Criado por
        <a
          href="https://www.editecsistema.com.br/"
          target="blank"
          title="Development company url"
          className="cursor-pointer"
        >
          {' '}
          Editec-Sistemas
        </a>
      </span>

      <Image
        className="h-full w-full object-cover"
        src="/images/background_login.png"
        alt="Background Login"
        priority={true}
        width={1920}
        height={1080}
      />
      {/* <video
        className="h-full w-full object-cover"
        loop
        autoPlay
        muted
        src="video/video.mp4"
        poster="images/back.jpg"
      ></video> */}
    </div>
  );
};

export default Video;
