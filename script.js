console.log("I have no clue what any of these words mean anymore. This is pure muscle memory");
var game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    backgroundColor: "#339933",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },  
    scene: {
        create
    }
});

function create() {
    this.add.text(100, 100, "pls center", {
        fontSize: "32px",
        color: "#ffffff",
    });
}
        
