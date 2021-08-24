(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) : factory();
})(function () {
	'use strict';

	/* eslint-disable require-jsdoc */ var grid,
		maxRecords = 300;
	function CustomPinnedRowRenderer() {}
	(CustomPinnedRowRenderer.prototype.init = function (params) {
		(this.eGui = document.createElement('div')),
			params.class && (this.eGui.className += ' ' + params.class),
			(this.eGui.innerHTML = params.value);
	}),
		(CustomPinnedRowRenderer.prototype.getGui = function () {
			return this.eGui;
		});
	var columnDefs = [
		{
			headerName: 'Producer group',
			field: 'producerGroup',
			hide: !0,
			rowGroup: !0
		},
		{ headerName: 'Producer', field: 'producer', hide: !0, rowGroup: !0 },
		{ headerName: 'Dpt.', field: 'department' },
		{ headerName: 'SA', field: 'sa' },
		{ headerName: 'BL', field: 'bl' },
		{ headerName: 'Jan.', field: 'january', aggFunc: 'sum' },
		{ headerName: 'Feb.', field: 'february', aggFunc: 'sum' },
		{ headerName: 'Mar.', field: 'march', aggFunc: 'sum' },
		{ headerName: 'Apr.', field: 'april', aggFunc: 'sum' },
		{ headerName: 'May', field: 'may', aggFunc: 'sum' },
		{ headerName: 'Jun.', field: 'june', aggFunc: 'sum' },
		{ headerName: 'Jul.', field: 'july', aggFunc: 'sum' },
		{ headerName: 'Aug.', field: 'august', aggFunc: 'sum' },
		{ headerName: 'Sept.', field: 'september', aggFunc: 'sum' },
		{ headerName: 'Oct.', field: 'october', aggFunc: 'sum' },
		{ headerName: 'Nov.', field: 'november', aggFunc: 'sum' },
		{ headerName: 'Dec.', field: 'december', aggFunc: 'sum' },
		{
			headerName: 'Total 2021',
			valueGetter: function valueGetter(params) {
				return (
					console.log(params),
					params.data.january +
						params.data.february +
						params.data.march +
						params.data.april +
						params.data.may +
						params.data.june +
						params.data.july +
						params.data.august +
						params.data.september +
						params.data.october +
						params.data.november +
						params.data.december
				);
			},
			pinned: 'right',
			aggFunc: 'sum',
			cellRendererSelector: function cellRendererSelector(params) {
				return params.node.rowPinned
					? { component: CustomPinnedRowRenderer, params: { class: 'merda' } }
					: void 0;
			}
		},
		{
			headerName: 'Budget 2021',
			field: 'budget',
			pinned: 'right',
			aggFunc: 'sum'
		},
		{
			headerName: 'Ecart 2021',
			valueGetter: function valueGetter(params) {
				return (
					params.data.january +
					params.data.february +
					params.data.march +
					params.data.april +
					params.data.may +
					params.data.june +
					params.data.july +
					params.data.august +
					params.data.september +
					params.data.october +
					params.data.november +
					params.data.december -
					params.data.budget
				);
			},
			valueFormatter: function valueFormatter(params) {
				return isNaN(params.value)
					? ''
					: 0 < params.value
					? '+' + params.value
					: params.value;
			},
			pinned: 'right',
			aggFunc: 'sum'
		}
	];
	function randomIntFromInterval(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	for (
		var groupIdent,
			prodIdent,
			jan,
			feb,
			mar,
			apr,
			may,
			jun,
			jul,
			aug,
			sept,
			oct,
			nov,
			dec,
			sa,
			bl,
			budget,
			defaultColumnDef = {
				filter: !0,
				sortable: !0,
				resizable: !0,
				suppressMenu: !0
			},
			rowData = [],
			group = 1,
			prod = 1,
			dep = randomIntFromInterval(15, 150),
			i = 1;
		i < maxRecords + 1;
		i++
	)
		(groupIdent = randomIntFromInterval(9, 18)),
			(prodIdent = randomIntFromInterval(3, 9)),
			(jan = randomIntFromInterval(15, 150)),
			(feb = randomIntFromInterval(15, 150)),
			(mar = randomIntFromInterval(15, 150)),
			(apr = randomIntFromInterval(15, 150)),
			(may = randomIntFromInterval(15, 150)),
			(jun = randomIntFromInterval(15, 150)),
			(jul = randomIntFromInterval(15, 150)),
			(aug = randomIntFromInterval(15, 150)),
			(sept = randomIntFromInterval(15, 150)),
			(oct = randomIntFromInterval(15, 150)),
			(nov = randomIntFromInterval(15, 150)),
			(dec = randomIntFromInterval(15, 150)),
			(budget = 12 * randomIntFromInterval(15, 150)),
			(dep = 0 == i % prodIdent ? randomIntFromInterval(15, 150) : dep),
			(sa = randomIntFromInterval(15, 150)),
			(bl = randomIntFromInterval(15, 150)),
			(group = 0 == i % groupIdent ? group + 1 : group),
			(prod = 0 == i % prodIdent ? prod + 1 : prod),
			rowData.push({
				producerGroup: 'Group ' + group,
				producer: 'producer ' + prod,
				wasteFamily: 'waste family ' + i,
				january: jan,
				february: feb,
				march: mar,
				april: apr,
				may: may,
				june: jun,
				july: jul,
				august: aug,
				september: sept,
				october: oct,
				november: nov,
				december: dec,
				budget: budget,
				department: 'DEP' + dep,
				sa: 'SA' + sa,
				bl: 'BL' + bl
			});
	var gridOptions = {
		columnDefs: columnDefs,
		defaultColDef: defaultColumnDef,
		rowData: rowData, // domLayout: 'autoHeight',
		rowSelection: 'multiple',
		headerHeight: 46,
		rowHeight: 64,
		suppressRowClickSelection: !0,
		onCellValueChanged: function onCellValueChanged(event) {
			console.log(event);
		},
		sideBar: {
			toolPanels: [
				{
					id: 'filters',
					labelDefault: 'Filters',
					labelKey: 'filters',
					iconKey: 'filter',
					toolPanel: 'agFiltersToolPanel'
				},
				{
					id: 'columns',
					labelDefault: 'Columns',
					labelKey: 'columns',
					iconKey: 'columns',
					toolPanel: 'agColumnsToolPanel'
				}
			],
			defaultToolPanel: void 0
		},
		autoGroupColumnDef: {
			field: 'wasteFamily',
			cellRendererParams: { suppressCount: !0 },
			pinned: 'left',
			minWidth: 300
		},
		enableRangeSelection: !0,
		statusBar: {
			statusPanels: [
				{
					statusPanel: 'agTotalAndFilteredRowCountComponent',
					key: 'totalAndFilter',
					align: 'left'
				},
				{ statusPanel: 'agSelectedRowCountComponent', align: 'left' },
				{ statusPanel: 'agAggregationComponent', align: 'right' }
			]
		},
		pinnedTopRowData: [
			{
				producerGroup: 'Nombre de jours ouvr\xE9s',
				wasteFamily: 'Nombre de jours ouvr\xE9s',
				january: 22,
				february: 22,
				march: 21,
				april: 21,
				may: 22,
				june: 22,
				july: 20,
				august: 21,
				september: 21,
				october: 21,
				november: 22,
				december: 22
			}
		]
	};
	function autoSizeAll(grid, skipHeader) {
		var allColumnIds = [];
		grid.gridOptions.columnApi.getAllColumns().forEach(function (column) {
			allColumnIds.push(column.colId);
		}),
			grid.gridOptions.columnApi.autoSizeColumns(allColumnIds, skipHeader);
	}
	document.addEventListener('DOMContentLoaded', function () {
		var gridDiv = document.querySelector('#myGrid'); // gridOptions.api.sizeColumnsToFit();
		(grid = new agGrid.Grid(gridDiv, gridOptions)),
			autoSizeAll(grid, !0),
			(window.grid = grid);
	});
});
//# sourceMappingURL=BudgetGrid.js.map
