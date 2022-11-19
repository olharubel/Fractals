var canvas = document.querySelector(".canvas-affine");
var ctx = canvas.getContext("2d");

//відмальовування координатної площини
export function drawCoordinatesSystem(grid_size) {

    var x_axis_starting_point = { number: 1, suffix: '' };
    var y_axis_starting_point = { number: 1, suffix: '' };

    var canvas_width = canvas.width = 700;
    var canvas_height = canvas.height = 550;

    var num_lines_x = Math.floor(canvas_height / grid_size);
    var num_lines_y = Math.floor(canvas_width / grid_size);

    var x_axis_distance_grid_lines = Math.floor(num_lines_x / 2) + 1;
    var y_axis_distance_grid_lines = Math.floor(num_lines_y / 2);

    for (var i = 0; i <= num_lines_x; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;

        if (i == x_axis_distance_grid_lines)
            ctx.strokeStyle = "#000000";
        else
            ctx.strokeStyle = "#e9e9e9";

        if (i == num_lines_x) {
            ctx.moveTo(0, grid_size * i);
            ctx.lineTo(canvas_width, grid_size * i);
        }
        else {
            ctx.moveTo(0, grid_size * i + 0.5);
            ctx.lineTo(canvas_width, grid_size * i + 0.5);
        }
        ctx.stroke();
    }

    for (i = 0; i <= num_lines_y; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;

        if (i == y_axis_distance_grid_lines)
            ctx.strokeStyle = "#000000";
        else
            ctx.strokeStyle = "#e9e9e9";

        if (i == num_lines_y) {
            ctx.moveTo(grid_size * i, 0);
            ctx.lineTo(grid_size * i, canvas_height);
        }
        else {
            ctx.moveTo(grid_size * i + 0.5, 0);
            ctx.lineTo(grid_size * i + 0.5, canvas_height);
        }
        ctx.stroke();
    }

    console.log("y " + y_axis_distance_grid_lines * grid_size)
    console.log("x " + x_axis_distance_grid_lines * grid_size)
    ctx.translate(y_axis_distance_grid_lines * grid_size, x_axis_distance_grid_lines * grid_size);

    for (var i = 1; i < (num_lines_y - y_axis_distance_grid_lines); i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        ctx.moveTo(grid_size * i + 0.5, -3);
        ctx.lineTo(grid_size * i + 0.5, 3);
        ctx.stroke();

        ctx.font = '9px Arial';
        ctx.textAlign = 'start';
        ctx.fillText(x_axis_starting_point.number * i + x_axis_starting_point.suffix, grid_size * i - 2, 15);

    }

    for (i = 1; i < y_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        ctx.moveTo(-grid_size * i + 0.5, -3);
        ctx.lineTo(-grid_size * i + 0.5, 3);
        ctx.stroke();

        ctx.font = '9px Arial';
        ctx.textAlign = 'end';
        ctx.fillText(-x_axis_starting_point.number * i + x_axis_starting_point.suffix, -grid_size * i + 3, 15);
    }

    for (i = 1; i < (num_lines_x - x_axis_distance_grid_lines); i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        ctx.moveTo(-3, grid_size * i + 0.5);
        ctx.lineTo(3, grid_size * i + 0.5);
        ctx.stroke();

        ctx.font = '9px Arial';
        ctx.textAlign = 'start';
        ctx.fillText(-y_axis_starting_point.number * i + y_axis_starting_point.suffix, 8, grid_size * i + 3);
    }


    for (i = 1; i < x_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        ctx.moveTo(-3, -grid_size * i + 0.5);
        ctx.lineTo(3, -grid_size * i + 0.5);
        ctx.stroke();

        ctx.font = '9px Arial';
        ctx.textAlign = 'start';
        ctx.fillText(y_axis_starting_point.number * i + y_axis_starting_point.suffix, 8, -grid_size * i + 3);
    }
}

//завантаження зображення афінного перетворення
document.querySelector('#download-button-affine').addEventListener('click', () => {
    var canvas = document.querySelector(".canvas-affine");
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

    var element = document.createElement('a');
    var filename = 'affine_transformation.png';
    element.setAttribute('href', image);
    element.setAttribute('download', filename);

    element.click();
})