// import Timeline from "../Timeline";
//из-за обработчиков событий в классе
// проблема с валидацией, поэтому решил вынести функцию в этот файл 

function validateCoords(coords) {
        
    if(!(/\[.+\]/.test(coords))) {
        return `[${coords}]`;
    }
    if(!(/\[.+ .+\]/.test(coords))) {
        const arrFromCoord = coords.split(',');
        const coord = `${arrFromCoord[0]}, ${arrFromCoord[1]}`;
        return coord;
    }
    return coords;
}
test('should check coords on brackets', () => {
	const result =validateCoords('12, 13');

	expect(result).toEqual('[12, 13]');
});

test('should check coords on space between', () => {
	const result =validateCoords('[12,13]');

	expect(result).toEqual('[12, 13]');
});