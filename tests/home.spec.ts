import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Home Page', () => {
    const searchTerms = [
        { term: 'hammer', expectedCount: 7 },
        { term: 'nail', expectedCount: 0 },
        { term: 'screw', expectedCount: 5 },
        { term: 'thor hammer', expectedCount: 1 },
        { term: 'pliers', expectedCount: 4 }
    ];    
    searchTerms.forEach(({ term, expectedCount }) => {
        test(`can search for ${term}`, async ({ page }) => {
            const homePage = new HomePage(page);
            await homePage.goto();
            await homePage.searchFor(term);
            
            expect(await homePage.gridCount()).toEqual(expectedCount);
        });
    });

    const categoriesFilters = [
        { categories: ['Hammer'], expectedCount: 7 },
        { categories: ['Hand Saw'], expectedCount: 1 },
        { categories: ['Wrench'], expectedCount: 3 },
        { categories: ['Power Tools'], expectedCount: 5 },
        { categories: ['Screwdriver', 'Chisels'], expectedCount: 5 },
        { categories: ['Sander', 'Drill', 'Tool Belts', 'Storage Solutions'], expectedCount: 7 }
    ];
    
    categoriesFilters.forEach(({ categories, expectedCount }) => {
        test(`can filter by categories ${categories.join(', ')}`, async ({ page }) => {
            const homePage = new HomePage(page);
            await homePage.goto();
            for (const element of categories) {
                await homePage.filterByCategory(element);
            }
            expect(await homePage.gridCount()).toEqual(expectedCount);
        });
    });

    const sortOptions = [
        { option: 'Name (A - Z)', expectedFirstItem: 'Adjustable Wrench' },
        { option: 'Name (Z - A)', expectedFirstItem: 'Wood Saw' },
        { option: 'Price (Low - High)', expectedFirstItem: 'Washers' },
        { option: 'Price (High - Low)', expectedFirstItem: 'Drawer Tool Cabinet' }   
    ];

    sortOptions.forEach(({ option, expectedFirstItem }) => {
        test(`can sort by ${option}`, async ({ page }) => {
            const homePage = new HomePage(page);
            await homePage.goto();
            await homePage.sortProducts(option);
            
            const products = await homePage.getProducts();
            expect(products[0].name).toEqual(expectedFirstItem);
        });
    });
});