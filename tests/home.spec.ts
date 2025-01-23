import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

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
});