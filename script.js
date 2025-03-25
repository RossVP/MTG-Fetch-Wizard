const cardName = "Akroan Crusader";
const cardCode = "lea";
const cardNum = "161";

class Card {
  constructor(amount, name, code, number) {
    this.amount = amount;
    this.name = name;
    this.code = code;
    this.number = number;
  }
}

  async function fetchCards(c, n) {
    
    try {
        const response = await fetch(`https://api.scryfall.com/cards/${c}/${n}`);
        const data = await response.json();
        const img = document.createElement(`img`);

        img.src = `https://api.scryfall.com/cards/${c}/${n}/?format=image`;
        document.getElementById("pics").appendChild(img);
    }
    catch(error) {
        console.error("Error fetching cards:", error);
    }
    
  }
  //Creates an array by splitting textarea input and assigns elements to constructor to be saved
  //in a json file. Calls the getDeck() function.
  function createDeck() {
    const deckInput = document.getElementById("deckIn");
    const lineArr = deckInput.value.split("\n");
    console.log(lineArr);
    const cardList =[];
    for(let i = 0; i < lineArr.length; i++) {
      const newCard = new Card(lineArr[i].substring(0,1), 
                                lineArr[i].substring(2, lineArr[i].indexOf("(")-1),
                                lineArr[i].substring(lineArr[i].indexOf("(")+1, lineArr[i].indexOf(")")),
                                lineArr[i].substring(lineArr[i].indexOf(")")+2));
      cardList.push(newCard);
    }
    
    const jsonString = JSON.stringify(cardList);
    localStorage.setItem("cards", jsonString);
    console.log(jsonString);
    getDeck();
  }

  function getDeck() {
    const savedJson = localStorage.getItem("cards");
    if (savedJson) {
      const arrParsed = JSON.parse(savedJson);

      const jsonDeck = arrParsed.map(obj => new Card(obj.amount, obj.name, obj.code, obj.number));
      console.log(jsonDeck[0].name);

      for (let i = 0; i < jsonDeck.length; i++) {
        fetchCards(jsonDeck[i].code, jsonDeck[i].number);
      }
    }
  }
  

  
  