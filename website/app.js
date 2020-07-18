/* Global Variables */
const apiKey = 'bc5a9f9d5bd7918efbf812f1fabb004d&units=imperial';
const apiUrl = `http://api.openweathermap.org/data/2.5/weather`;
const zipCodeInput = document.getElementById('zip');
const feelingsInput = document.getElementById('feelings');
const generateBtn = document.getElementById('generate');

// Get Data from API
const getData = async (zipCode) => {
	const url = `${apiUrl}?zip=${zipCode}&appid=${apiKey}`;

	const res = await fetch(url);

	try {
		const data = await res.json();
		console.log('API Data', data);
		return data;
	} catch (error) {
		console.log('GET Error', error);
	}
};

// Post Data to projectData
const postData = async (url = '', data = {}) => {
	const res = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(data)
	});

	try {
		const newData = res.json();
		console.log(newData);
		return newData;
	} catch (error) {
		console.log('POST Error', error);
	}
};

// Update UI
const updateUI = async () => {
	const request = await fetch('/all');

	try {
		const allData = await request.json();
		console.log('ALLDATA', allData);
		const lastDataItem = allData[Object.keys(allData).length - 1];

		document.getElementById('date').innerHTML = `<span>Date: </span> ${lastDataItem.date}`;
		document.getElementById('temp').innerHTML = `<span>Temprature: </span> ${lastDataItem.temp}`;
		document.getElementById('content').innerHTML = `<span>Feeling: </span> ${lastDataItem.content}`;
	} catch (error) {
		console.log('ALLDATA Error', error);
	}
};

// Generate Eventlistener
generateBtn.addEventListener('click', () => {
	const zipCode = zipCodeInput.value;
	const content = feelingsInput.value;

	// Create a new date instance dynamically with JS
	let d = new Date();
	let date = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

	getData(zipCode).then((data) => {
		const newData = {
			date,
			temp: data.main.temp,
			content
		};
		postData('/add', newData).then(updateUI());
	});
	console.log({ zipCode, feelings });
});
