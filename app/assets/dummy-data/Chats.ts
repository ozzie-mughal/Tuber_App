export default {
	id: '1',
	users: [{
		id: 'u1',
		name: 'Vadim',
		imageUri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg',
	}, {
		id: 'u2',
		name: 'Elon Musk',
		imageUri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png',
	}],
	messages: [{
		id: 'm2',
		content: 'Let me a send a picture of the equation.',
		createdAt: '2020-10-03T14:49:00.000Z',
		user: {
			id: 'u1',
			name: 'Me',
		}}, {
		id: 'm1',
		content: 'Hey, how I can help you out?',
		createdAt: '2020-10-10T12:48:00.000Z',
		user: {
			id: 'u2',
			name: 'Elon Musk',
		}
	}]
}

