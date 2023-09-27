import { FileAudioIcon, ImageIcon, Trash, Video } from 'lucide-react';
import Image from 'next/image';

interface BatchItemShowcaseProps {
  file: string;
  filename: string;
  index: number;
  fileFormat: string;
  fileType: string;
  handleSingleFileDelete: (index: number) => void;
  onClick?: () => void;
}

export function BatchItemShowcase({
  file,
  filename,
  index,
  fileFormat,
  fileType,
  handleSingleFileDelete,
  onClick,
}: BatchItemShowcaseProps) {
  const imageClassNames = 'min-h-[12rem] h-[8rem] w-full rounded-[8px_28px_8px_8px] object-cover';
  return (
    <div
      key={index}
      className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-105"
      onClick={onClick}
    >
      {fileType === 'video' ? (
        <video autoPlay={true} muted={true} src={file} className={imageClassNames} />
      ) : fileType === 'audio' ? (
        <div>
          <Image
            src="/Frame-default-img.svg"
            alt="nft"
            className={imageClassNames}
            height={64}
            width={64}
          />
          <audio src={file} className={imageClassNames} />
        </div>
      ) : (
        <Image src={file} alt={filename} className={imageClassNames} height={64} width={64} />
      )}
      <div className="flex w-full items-center justify-between rounded-md bg-secondary-foreground px-3 py-3 sm:w-full">
        <div className="flex items-center gap-2">
          {fileType === 'image' ? (
            <ImageIcon className="h-5 w-5" />
          ) : fileType === 'audio' ? (
            <FileAudioIcon className="h-5 w-5" />
          ) : (
            <Video className="h-5 w-5" />
          )}
          <div className="flex gap-2 text-sm">
            <p className="max-w-[7rem] truncate sm:max-w-[12rem] lg:max-w-[14rem]">{filename}</p>
            <p className="">{fileFormat}</p>
          </div>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleSingleFileDelete(index);
          }}
        >
          <Trash className="h-5 w-5 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
