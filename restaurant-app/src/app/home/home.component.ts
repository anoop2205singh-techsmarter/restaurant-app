import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../services/menu.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    isMenuOpen = false;
    featuredDishes: any[] = [];
    categories = ['All', 'Starters', 'Pizza', 'Pasta', 'Main', 'Dessert', 'Cocktails'];
    selectedCategory = 'All';

    constructor(private menuService: MenuService) { }

    ngOnInit() {
        this.menuService.getMenuItems().subscribe(data => {
            this.featuredDishes = data;
        });
    }

    get filteredDishes() {
        if (this.selectedCategory === 'All') {
            return this.featuredDishes;
        }
        return this.featuredDishes.filter(dish => dish.category === this.selectedCategory);
    }

    selectCategory(category: string) {
        this.selectedCategory = category;
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }
}
