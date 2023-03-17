var startIndex = 0;

function loadMoreCards(){
fetch("../data.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var card = '';
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        startIndex = document.querySelectorAll('.card').length;
        var endIndex = startIndex + 4; //ova e za novite cards
        if(endIndex >= data.length)
        {
            loadMoreBtn.style.display = 'none';//go snemuva kopceto dokolku loadne do kraj
            document.querySelector('.layout-placeholder').style.marginTop = "-850px";
        }
        for(let i=startIndex; i<endIndex && i<data.length; i++)
        {
            //ova e za date 
         const dateString = data[i].date;
         const dateObj = new Date(dateString);
         const obj = dateObj.toDateString();
         const finalString = obj.split(" ");
         const first = finalString[2];
         const second = finalString[1];
         const third = finalString[3];
         const final = first + " " + second + " " + third;
         console.log(final);

            //ova e za logo(facebook ili instagram)
        var socialMediaLogo = data[i].source_type;
        var imageSource = "";
        if(socialMediaLogo=="instagram")
        {
            imageSource = "../icons/instagram-logo.svg";
        }
        else
        {
            imageSource = "../icons/facebook.svg";
        }
        
        
         card += `
					<div class="card">
						<div class="card-header">
							<img src = "${data[i].profile_image}" style="border-radius: 50%; width: 50px">
							<span style = "font-weight:bold">${data[i].name}</span>
							<span>${final}</span>
							<img src="${imageSource}" class="logo">
						</div>
						<img src="${data[i].image}" class="bigImage">
						<p>${data[i].caption}</p>
						<hr>
                        <div class="card-footer">
						<img src="../icons/heart.svg">
                        <span>${data[i].likes}</span>
                        </div>
					</div>
				
        `;
        
        }
        
        let previewHeight = document.querySelector('.preview');
        let newHeight = previewHeight.clientHeight + 1000;
        previewHeight.style.height = newHeight + 'px';
        
        



        document.querySelector(".layout-placeholder").innerHTML += card;
        

        //this event listener is for the heart icon
        


        //Choose theme
        const lightThemeRadio = document.getElementById('lightTheme');//light theme
        const darkThemeRadio = document.getElementById('darkTheme'); //dark theme
        const cards = document.querySelectorAll('.card');
        //console.log(cards);

        function chooseTheme(){
        lightThemeRadio.addEventListener('change', () => {
        for(let i=0; i< cards.length; i++)
        {
        cards[i].classList.add('light');
        cards[i].classList.remove('black');
        }
        });

        darkThemeRadio.addEventListener('change', () => {
        for(let i=0; i< cards.length; i++)
        {
            cards[i].classList.add('black');
            cards[i].classList.remove('light');
        }
        });
        }
        chooseTheme();





        //za promena na space between cards
        const spaceBetweenCards = document.getElementById("cardSpaceBetween");//go zimame input poleto
        spaceBetweenCards.addEventListener("input", updateSpaceBetweenCards);
        function updateSpaceBetweenCards()
        {
            const newSpaceBetweenCards = spaceBetweenCards.value;
           // console.log(newSpaceBetweenCards);
            const allTheCards = document.querySelectorAll(".card");
            allTheCards.forEach(oneCard => {
                oneCard.style.margin = newSpaceBetweenCards; //vaka kje se promeni space between cards i dokolku nema nisto kje si ostane default vrednosta 10px
               // console.log(oneCard.style.margin);
            })
        }
        updateSpaceBetweenCards();

        //za promena na backgroundColor na cards
        const cardBackgroundColorInput = document.getElementById("cardBackgroundColor");
        cardBackgroundColorInput.addEventListener("input", updateCardBackground);
        function updateCardBackground() {
            const cardBackgroundColor = cardBackgroundColorInput.value;
            const cards = document.querySelectorAll(".card");
            cards.forEach(card => {
                card.style.backgroundColor = cardBackgroundColor;
            });
        }
        updateCardBackground();
        
    })

}
loadMoreCards();

const loadMoreBtn = document.getElementById('loadMoreBtn');
loadMoreBtn.addEventListener('click', loadMoreCards);
    
