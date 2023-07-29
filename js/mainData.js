const mainData = () => {
    fetch('https://anime-a0299-default-rtdb.firebaseio.com/anime.json')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data);
        })
}

mainData()