import fs from 'fs/promises';
import crypto from 'crypto'
const path = './cocktails.json';

class CocktailsManager{
    cocktails = [];

    constructor(cocktails = []){
        this.cocktails = cocktails;
    }

    randomID(){
        return crypto.randomUUID();
    }

    async setCocktail(cocktail){
        try {
            await this.getcocktailss();
            cocktail.id = this.randomID();
            this.cocktails.push(cocktail);
            const data = JSON.stringify(this.cocktails, null, 2);
            
            await fs.writeFile(path, data);
            return cocktail.id
        } catch (error) {
            console.log({error})
            console.error('No pudimos guardar el Cocktail');
        }
    }  
    

    async getCocktails(){
        try {
            const data = await fs.readFile(path, 'utf-8');
            this.cocktails = JSON.parse(data);
            return this.cocktails;
        } catch (error) {
            console.error('No pudimos leer los Cocktails')
        }
    }

    async getCocktailbyId(id){
        await this.getCocktails();
        const cocktail = this.cocktails.find(cocktail => cocktail.id == id);
        return cocktail ? cocktail : undefined;
    }

    async deleteCocktailById(id) {
        await this.getCocktails();
        const index = this.cocktails.findIndex(cocktails => cocktails.id == id);
        if(index != -1){
            this.cocktailss.splice(index, 1);
            const data = JSON.stringify(this.cocktailss, null, 2);
            await fs.writeFile(path, data);
            return true
        } else {
            return false;
        }
    }

    async updateCocktailById(id, cocktail){
        await this.getCocktails();
        const index = this.cocktails.findIndex(cocktail => cocktail.id == id);
        if (index != -1){ //CORREGIR
            this.cocktails[index].name = cocktail.name ? cocktail.name : this.cocktails[index].name;
            this.cocktails[index].iba = cocktail.iba ? cocktail.iba : this.cocktails[index].iba;
            this.cocktails[index].glass = cocktail.glass ? cocktail.glass : this.cocktails[index].glass;
            this.cocktails[index].category = cocktail.category ? cocktail.category : this.cocktails[index].category;
            this.cocktails[index].colors = cocktail.colors ? cocktail.colors : this.cocktails[index].colors;
            this.cocktails[index].ingredients = cocktail.ingredients ? cocktail.ingredients : this.cocktails[index].ingredients;
            this.cocktails[index].garnish = cocktail.garnish ? cocktail.garnish : this.cocktails[index].garnish;
            this.cocktails[index].preparation = cocktail.preparation ? cocktail.preparation : this.cocktails[index].preparation;
            const data = JSON.stringify(this.cocktails, null, 2);

            await fs.writeFile(path, data);
            return true
        } else {
            return false;
        }
    }
    
}

export default CocktailsManager;