class Food {
    constructor(){
        var options = {
            'isStatic': true,
            'restitution':0,
            'friction':1.0,
            'density':1.0
          }
        this.foodStock = 0;
        this.lastFed = 0;
        this.image = loadImage("images/Milk.png");
        this.body = Bodies.rectangle(x, y);
        this.width = 10;
        this.height = 20;
        World.add(world, this.body);
    }
        

    getFoodStock(){
        var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
    }

    updateFoodStock(foodStock){
        database.ref('/').update({
            foodStock: foodStock
          });
    }

    deductFood(){

    }

    display(){
        var x=80,y=100;

        imageMode(CENTER);
        image(this.image, 0, 0, this.width, this.height);

        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++)
                if(i%10==0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
        }
    }
}