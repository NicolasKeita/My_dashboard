
function widget3_selection()
{
    const widget1_chose = document.getElementById("widget1_chose").value;
    const widget2_chose = document.getElementById("widget2_chose").value;
    const widget3_chose = document.getElementById("widget3_chose").value;
    const url = "/dashboard" +
        "?widget1=" + encodeURIComponent(widget1_chose) +
        "&widget2=" + encodeURIComponent(widget2_chose) +
        "&widget3=" + encodeURIComponent(widget3_chose);
    window.location.href = url;
}

