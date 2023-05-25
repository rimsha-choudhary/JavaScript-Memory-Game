const settings = {
    set values(value) {
        localStorage.setItem("playerName", value.playerName);
        localStorage.setItem("numberOfCards", value.numberOfCards);
    },
    get values() {
        return {
            playerName: localStorage.getItem("playerName"),
            numberOfCards: localStorage.getItem("numberOfCards"),
        };
    },
};
  