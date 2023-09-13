

const form = document.querySelector('.js-quiz-form');
const formItems = form.querySelectorAll('fieldset');
const btnsNext = document.querySelectorAll('.js-next');
const btnSubmit = document.querySelector('.js-submit');
const formItemLast = formItems[formItems.length - 1];
const resultsList = document.querySelector('.results-list');
let resultContent = '';
const results = [];

btnSubmit.disabled = true;

document.addEventListener ('click', (evt) => {
		
	if(evt.target.closest('button')){
		evt.preventDefault();
	};

	if (evt.target.closest('.js-start')) {
		document.querySelector('.head').classList.add('d-none');
		document.querySelector('.wrapper').classList.remove('wrapper-head');
		document.querySelector('.quiz').classList.remove('d-none');
	};
	if (evt.target.closest('.js-order')) {
		document.querySelector('.end').classList.add('d-none');
		document.querySelector('.order').classList.remove('d-none');
	};
	if (evt.target.closest('.btn-popup')) {
		document.querySelector('.form__popup').classList.remove('d-none');
	};
	if (evt.target.closest('.close-popup') || evt.target.closest('.js-popup-submit')) {
		document.querySelector('.form__popup').classList.add('d-none');
	};
	if (evt.target.closest('.form__popup') && !evt.target.closest('.popup-wrapper')) {
		document.querySelector('.form__popup').classList.add('d-none');
	};

	btnsNext.forEach((btn, btnIndex) => {
		if (evt.target == btn) {
			formItems[btnIndex].classList.add('d-none');
			formItems[btnIndex + 1].classList.remove('d-none');

			const answerAll = formItems[btnIndex].querySelectorAll('.js-answer');
			answerAll.forEach((answer) => {
				if(answer.value) {
					results.push({[answer.name]: answer.value});
				} else {
					results.push({[answer.name]: 'Пожеланий нет'});
				};
			});
		};
	});
	if(evt.target == btnSubmit) {
		const answerLast = formItemLast.querySelector('.js-answer');
		const radioChecked = formItemLast.querySelector('input:checked');
		
		results.push({['Способ связи']: radioChecked.value});
		results.push({[answerLast.name]: answerLast.value});
		
		document.querySelector('.quiz').classList.add('d-none');
		document.querySelector('.end').classList.remove('d-none');
		
		results.forEach((result) => {
			const key = Object.keys(result);
			const value = Object.values(result);
			resultContent += `
			<li class="results-item">
				<span>${key[0]}:</span> ${value[0]}
			</li>
			`;
		});
		resultsList.innerHTML = resultContent;
	};	
});

formItems.forEach((formItem, formItemIndex) => {
	const inputTxt = formItem.querySelector('.input');

	if(formItem !== formItemLast && !btnsNext[formItemIndex].classList.contains('js-enabled')) {
		btnsNext[formItemIndex].disabled = true;
	};

	formItem.addEventListener('input', (evt) => {
		if(formItem == formItemLast) {
		   const radioChecked = formItemLast.querySelectorAll('input:checked');
		   const lastInput = formItemLast.querySelector('.input');
		   if(radioChecked.length > 0 && lastInput.value) {
				btnSubmit.disabled = false;
		   } else {
				btnSubmit.disabled = true;
		   };
		};
		if (inputTxt && formItem !== formItemLast) {
			if(inputTxt.value) {
				btnsNext[formItemIndex].disabled = false;
			} else {
				btnsNext[formItemIndex].disabled = true;
			};
		};
	});
});




