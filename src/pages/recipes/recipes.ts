import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe-list';
import { RecipePage } from '../recipe/recipe';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage implements OnInit{
  recipeList: Recipe[];
  constructor(private navCtrl: NavController,
              private recipeService: RecipeService) {}

  ngOnInit() {
    this.getRecipeList();
  }

  ionViewWillEnter(){
    this.getRecipeList();
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    const selectedRecipe = this.recipeList[index];
    this.navCtrl.push(RecipePage, {recipe: selectedRecipe, index: index});
  }

  private getRecipeList() {
    this.recipeList = this.recipeService.getRecipes();
  }
}
