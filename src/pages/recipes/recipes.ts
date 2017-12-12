import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe-list';

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

  ionViewDidEnter(){
    this.getRecipeList();
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  private getRecipeList() {
    this.recipeList = this.recipeService.getRecipes();
  }
}
