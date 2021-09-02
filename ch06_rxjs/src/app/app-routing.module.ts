import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
	{
		path: 'home',
		loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
	},
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path: 'observable',
		loadChildren: () => import('./observable/observable.module').then(m => m.ObservablePageModule)
	},
	{
		path: 'subject',
		loadChildren: () => import('./subject/subject.module').then(m => m.SubjectPageModule)
	},
	{
		path: 'operator',
		loadChildren: () => import('./operator/operator.module').then(m => m.OperatorPageModule)
	},
	{
		path: 'creation',
		loadChildren: () => import('./creation/creation.module').then(m => m.CreationPageModule)
	},
	{
		path: 'filter',
		loadChildren: () => import('./filter/filter.module').then(m => m.FilterPageModule)
	},
	{
		path: 'transformation',
		loadChildren: () => import('./transformation/transformation.module').then(m => m.TransformationPageModule)
	},
	{
		path: 'combining',
		loadChildren: () => import('./combining/combining.module').then(m => m.CombiningPageModule)
	},
	{
		path: 'conditional',
		loadChildren: () => import('./conditional/conditional.module').then(m => m.ConditionalPageModule)
	},
	{
		path: 'mathematical',
		loadChildren: () => import('./mathematical/mathematical.module').then(m => m.MathematicalPageModule)
	},
	{
		path: 'utility',
		loadChildren: () => import('./utility/utility.module').then(m => m.UtilityPageModule)
	},
	{
		path: 'error',
		loadChildren: () => import('./error/error.module').then(m => m.ErrorPageModule)
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
