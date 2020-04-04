timedRefresh(1000 * 60);

function timedRefresh(time) {
    setTimeout("location.reload(true);", time);
}