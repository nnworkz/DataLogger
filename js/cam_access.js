async function photo()
{
    const video = document.createElement("video");
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    video.srcObject = stream;
    video.muted = true;

    await video.play();

    const canvas = document.createElement("canvas");
    const { videoWidth, videoHeight } = video;

    canvas.width = videoWidth;
    canvas.height = videoHeight;

    canvas.getContext("2d").drawImage(video, 0, 0, videoWidth, videoHeight);
    stream.getTracks().forEach(track => track.stop());

    const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));

    if (blob)
    {
        const reader = new FileReader();
        reader.onloadend = async () =>
        {
            await send("image", reader.result.split(",")[1]);
        }

        reader.readAsDataURL(blob);
    }
}
