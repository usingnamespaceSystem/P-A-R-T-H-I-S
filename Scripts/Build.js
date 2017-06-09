/* Hide result table and write all pages to array for case of page swaping */
document.getElementById( "table" ).style.display = "none";
document.getElementById( "back" ).style.display = "none";
var controls = [7];
controls[0] = document.getElementById( "MainContent_Markets_place" );
controls[1] = document.getElementById( "MainContent_Channels_place" );
controls[2] = document.getElementById( "MainContent_Contestors_place" );
controls[3] = document.getElementById( "MainContent_Goods_place" );
controls[4] = document.getElementById( "MainContent_Providers_place" );
controls[5] = document.getElementById( "MainContent_Res_place" );
controls[6] = document.getElementById( "MainContent_Cont_goods_place" );
controls[7] = document.getElementById( "MainContent_fixed_assets_place" );
controls[8] = document.getElementById( "MainContent_position_place" );
controls[9] = document.getElementById( "MainContent_mbp_place" );
controls[10] = document.getElementById( "MainContent_electricity_place" );
controls[11] = document.getElementById( "MainContent_rent_place" );
controls[12] = document.getElementById( "MainContent_Processes_place" );
controls[13] = document.getElementById( "MainContent_Functions_place" );
controls[14] = document.getElementById( "MainContent_Operations_place" );

//main app JSON structure
var model = JSON.parse( localStorage.getItem( "JSON" ) );
let group_storage = {};
//array for currently clicked parts of model
var current_parts = {
	"CurrentMarket": 0,
	"CurrentChannel": 0,
	"CurrentGoods": 0,
	"CurrentProvider": 0,
	"CurrentContestor": 0,
	"CurrentRes": 0,
	"CurrentProcess": 0,
	"CurrentFunction": 0,
};

//model root 
var markets = model["Organization"][0]["Markets"];

//hide all pages except current
for ( var i = 0; i < 15; i++ ) {
	if ( localStorage.getItem( "current" ) == null ) {
		localStorage.setItem( "current", 0 );
	}
	if ( i != localStorage.getItem( "current" ) ) {
		controls[i].style.display = "none";
	}
}

NextBlock( "0", "Markets" );

/* Desribes behaviour of page swapping */
function NextBlock( go_to_page, path_to_element ) {
	localStorage.setItem( "current", go_to_page );
	controls[go_to_page].style.display = "block";

	var back = document.getElementById( "back" );
	var path = document.getElementById( "path" );

	for ( var i = 0; i < 15; i++ ) {
		if ( i != go_to_page ) {
			controls[i].style.display = "none";
		}
	}

	let route = path_to_element.replace( /[^-0-9-]/gim, '' ).split( '-' );

	if ( path_to_element.includes( "Channels" ) ) {
		document.getElementById( "back" ).style.display = "block";
		current_parts["CurrentMarket"] = path_to_element.replace( /[^-0-9]/gim, '' );
	}
	else if ( path_to_element.includes( "Goods" ) ) {
		current_parts["CurrentChannel"] = route[route.length - 1];
	}
	else if ( path_to_element.includes( "Provider" ) ) {
		current_parts["CurrentGoods"] = route[route.length - 1];
	}
	else if ( path_to_element.includes( "Contestor" ) ) {
		document.getElementById( "back" ).style.display = "block";
		current_parts["CurrentMarket"] = path_to_element.replace( /[^-0-9]/gim, '' );
	}
	else if ( path_to_element.includes( "Res" ) ) {
		current_parts["CurrentGoods"] = route[route.length - 1];
	}
	else if ( path_to_element.includes( "Cont_goods" ) ) {
		current_parts["CurrentContestor"] = route[route.length - 1];
	}
	else if ( path_to_element.includes( "Process" ) ) {
		current_parts["CurrentProcess"] = route[route.length - 1];
	}
	else if ( path_to_element.includes( "Function" ) ) {
		current_parts["CurrentFunction"] = route[route.length - 1];
	}
	else if ( path_to_element.includes( "MBP" ) ) {
		current_parts["CurrentChannel"] = route[route.length - 1];
	}
	else if ( path_to_element.includes( "Assets" ) ) {
		current_parts["CurrentChannel"] = route[route.length - 1];
	}
	else if ( path_to_element.includes( "Rent" ) ) {
		current_parts["CurrentChannel"] = route[route.length - 1];
	}
	else if ( path_to_element.includes( "Electricity" ) ) {
		current_parts["CurrentChannel"] = route[route.length - 1];
	}
	else if ( path_to_element.includes( "Positions" ) ) {
		current_parts["CurrentChannel"] = route[route.length - 1];
	}

	if ( go_to_page == 0 ) {
		path.style.display = "none";
		document.getElementById( "back" ).style.display = "none";
	}
	else if ( go_to_page == 1 ) {
		var channels = model["Organization"][0]
			["Markets"][current_parts["CurrentMarket"]]
			["Market" + current_parts["CurrentMarket"]][0]
			["Channels"];

		back.onclick = function () {
			NextBlock( '0', 'Markets' );
		};
		path.style.display = "block";
		if ( channels.length == 0 ) {
			document.getElementById( "add_channel" ).style.display = "block";
		}
		else {
			document.getElementById( "add_channel" ).style.display = "none";
		}

		path.innerText = markets[current_parts["CurrentMarket"]]["Market" + current_parts["CurrentMarket"]][0]["Name"]
						+ " / Каналы сбыта";
	}
	else if ( go_to_page == 2 ) {
		var contestors = model
		   ["Organization"][0]
		   ["Markets"][current_parts["CurrentMarket"]]
		   ["Market" + current_parts["CurrentMarket"]][0]
		   ["Contestors"];
		
		back.onclick = function () {
			NextBlock( '0', 'Markets' );
		};
		path.style.display = "block";
		if ( contestors.length == 0 ) {
			document.getElementById( "add_contestor" ).style.display = "block";
		}
		else {
			document.getElementById( "add_contestor" ).style.display = "none";
		}

		path.innerText = markets[current_parts["CurrentMarket"]]["Market" + current_parts["CurrentMarket"]][0]["Name"]
						+ " / Конкуренты";
	}
	else if ( go_to_page == 3 ) {
		var goods = model["Organization"][0]
			["Markets"][current_parts["CurrentMarket"]]
			["Market" + current_parts["CurrentMarket"]][0]
			["Channels"][current_parts["CurrentChannel"]]
			["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
			["Goods"];

		var channels = model["Organization"][0]
			["Markets"][current_parts["CurrentMarket"]]
			["Market" + current_parts["CurrentMarket"]][0]
			["Channels"];

		back.onclick = function () {
			NextBlock( '1', current_parts['CurrentMarket'] );
		};

		if ( goods.length == 0 ) {
			document.getElementById( "add_goods" ).style.display = "block";
		}
		else {
			document.getElementById( "add_goods" ).style.display = "none";
		}

		path.innerText = markets[current_parts["CurrentMarket"]]["Market" + current_parts["CurrentMarket"]][0]["Name"]
						+ " / " + channels[current_parts["CurrentChannel"]]["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]["Name"]
						+ " / Товары";
	}
	else if ( go_to_page == 4 ) {
		var providers = model
			["Organization"][0]
			["Markets"][current_parts["CurrentMarket"]]
			["Market" + current_parts["CurrentMarket"]][0]
			["Channels"][current_parts["CurrentChannel"]]
			["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
			["Goods"][current_parts["CurrentGoods"]]
			["Goods" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentGoods"]][0]["Providers"];

		var channels = model["Organization"][0]
			["Markets"][current_parts["CurrentMarket"]]
			["Market" + current_parts["CurrentMarket"]][0]
			["Channels"];

		var goods = model["Organization"][0]
			["Markets"][current_parts["CurrentMarket"]]
			["Market" + current_parts["CurrentMarket"]][0]
			["Channels"][current_parts["CurrentChannel"]]
			["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
			["Goods"];

		back.onclick = function () {
			NextBlock( '3', current_parts['CurrentMarket'] + '-' + current_parts['CurrentChannel'] );
		};

		if ( providers.length == 0 ) {
			document.getElementById( "add_provider" ).style.display = "block";
		}
		else {
			document.getElementById( "add_provider" ).style.display = "none";
		}

		path.innerText = markets[current_parts["CurrentMarket"]]["Market" + current_parts["CurrentMarket"]][0]["Name"]
						+ " / " + channels[current_parts["CurrentChannel"]]["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]["Name"]
						+ " / " + goods[current_parts["CurrentGoods"]]["Goods" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentGoods"]][0]["Name"] + " / Поставщики";
	}
	else if ( go_to_page == 5 ) {

	}
	else if ( go_to_page == 6 ) {
		var contestor_goods = model
		   ["Organization"][0]
		   ["Markets"][current_parts["CurrentMarket"]]
		   ["Market" + current_parts["CurrentMarket"]][0]
		   ["Contestors"][current_parts["CurrentContestor"]]
		   ["Contestor" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentContestor"]][0]["Goods"];
		var contestors = model
		   ["Organization"][0]
		   ["Markets"][current_parts["CurrentMarket"]]
		   ["Market" + current_parts["CurrentMarket"]][0]
		   ["Contestors"];

		back.onclick = function () {
			NextBlock( '2', current_parts['CurrentMarket'] );
		};

		if ( contestor_goods.length == 0 ) {
			document.getElementById( "add_cont_goods" ).style.display = "block";
		}
		else {
			document.getElementById( "add_cont_goods" ).style.display = "none";
		}

		path.innerText = markets[current_parts["CurrentMarket"]]["Market" + current_parts["CurrentMarket"]][0]["Name"]
						+ " / " + contestors[current_parts["CurrentContestor"]]["Contestor" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentContestor"]][0]["Name"]
						+ " / Товары";
	}
	else if ( go_to_page == 7 ) {
		var assets = model["Organization"][0]
			["Markets"][current_parts["CurrentMarket"]]
			["Market" + current_parts["CurrentMarket"]][0]
			["Channels"][current_parts["CurrentChannel"]]
			["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
			["Assets"];

		var channels = model["Organization"][0]
			["Markets"][current_parts["CurrentMarket"]]
			["Market" + current_parts["CurrentMarket"]][0]
			["Channels"];

		back.onclick = function () {
			NextBlock( '1', current_parts['CurrentMarket'] );
		};

		if ( assets.length == 0 ) {
			document.getElementById( "add_assets" ).style.display = "block";
		}
		else {
			document.getElementById( "add_assets" ).style.display = "none";
		}

		path.innerText = markets[current_parts["CurrentMarket"]]["Market" + current_parts["CurrentMarket"]][0]["Name"]
						+ " / " + channels[current_parts["CurrentChannel"]]["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]["Name"]
						+ " / Основные средства";
	}
	else if ( go_to_page == 8 ) {
		var positions = model["Organization"][0]
			["Markets"][current_parts["CurrentMarket"]]
			["Market" + current_parts["CurrentMarket"]][0]
			["Channels"][current_parts["CurrentChannel"]]
			["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
			["Positions"];

		var channels = model["Organization"][0]
			["Markets"][current_parts["CurrentMarket"]]
			["Market" + current_parts["CurrentMarket"]][0]
			["Channels"];

		back.onclick = function () {
			NextBlock( '1', current_parts['CurrentMarket'] );
		};

		if ( positions.length == 0 ) {
			document.getElementById( "add_position" ).style.display = "block";
		}
		else {
			document.getElementById( "add_position" ).style.display = "none";
		}

		path.innerText = markets[current_parts["CurrentMarket"]]["Market" + current_parts["CurrentMarket"]][0]["Name"]
						+ " / " + channels[current_parts["CurrentChannel"]]["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]["Name"]
						+ " / Должности";
	}
	else if ( go_to_page == 9 ) {
		var mbp = model["Organization"][0]
			["Markets"][current_parts["CurrentMarket"]]
			["Market" + current_parts["CurrentMarket"]][0]
			["Channels"][current_parts["CurrentChannel"]]
			["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
			["MBP"];

		var channels = model["Organization"][0]
			["Markets"][current_parts["CurrentMarket"]]
			["Market" + current_parts["CurrentMarket"]][0]
			["Channels"];

		back.onclick = function () {
			NextBlock( '1', current_parts['CurrentMarket'] );
		};

		if ( mbp.length == 0 ) {
			document.getElementById( "add_mbp" ).style.display = "block";
		}
		else {
			document.getElementById( "add_mbp" ).style.display = "none";
		}

		path.innerText = markets[current_parts["CurrentMarket"]]["Market" + current_parts["CurrentMarket"]][0]["Name"]
						+ " / " + channels[current_parts["CurrentChannel"]]["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]["Name"]
						+ " / МБП";
	}
	else if ( go_to_page == 10 ) {
		var electricity = model["Organization"][0]
			["Markets"][current_parts["CurrentMarket"]]
			["Market" + current_parts["CurrentMarket"]][0]
			["Channels"][current_parts["CurrentChannel"]]
			["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
			["Electricity"];
		var channels = model["Organization"][0]
			["Markets"][current_parts["CurrentMarket"]]
			["Market" + current_parts["CurrentMarket"]][0]
			["Channels"];

		back.onclick = function () {
			NextBlock( '1', current_parts['CurrentMarket'] );
		};

		if ( electricity.length == 0 ) {
			document.getElementById( "add_elect" ).style.display = "block";
		}
		else {
			document.getElementById( "add_elect" ).style.display = "none";
		}

		path.innerText = markets[current_parts["CurrentMarket"]]["Market" + current_parts["CurrentMarket"]][0]["Name"]
						+ " / " + channels[current_parts["CurrentChannel"]]["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]["Name"]
						+ " / Энергопотребляющее оборудование";
	}
	else if ( go_to_page == 11 ) {
		var rent = model["Organization"][0]
			["Markets"][current_parts["CurrentMarket"]]
			["Market" + current_parts["CurrentMarket"]][0]
			["Channels"][current_parts["CurrentChannel"]]
			["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
			["Rent"];

		var channels = model["Organization"][0]
			["Markets"][current_parts["CurrentMarket"]]
			["Market" + current_parts["CurrentMarket"]][0]
			["Channels"];

		back.onclick = function () {
			NextBlock( '1', current_parts['CurrentMarket'] );
		};

		if ( rent.length == 0 ) {
			document.getElementById( "add_rent" ).style.display = "block";
		}
		else {
			document.getElementById( "add_rent" ).style.display = "none";
		}

		path.innerText = markets[current_parts["CurrentMarket"]]["Market" + current_parts["CurrentMarket"]][0]["Name"]
						+ " / " + channels[current_parts["CurrentChannel"]]["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]["Name"]
						+ " / Арендуемые объекты";
	}
	else if ( go_to_page == 12 ) {
		var processes = model["Organization"][0]
			["Markets"][current_parts["CurrentMarket"]]
			["Market" + current_parts["CurrentMarket"]][0]
			["Channels"][current_parts["CurrentChannel"]]
			["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
			["Processes"];

		var channels = model["Organization"][0]
			["Markets"][current_parts["CurrentMarket"]]
			["Market" + current_parts["CurrentMarket"]][0]
			["Channels"];

		back.onclick = function () {
			NextBlock( '1', current_parts['CurrentMarket'] );
		};

		if ( processes.length == 0 ) {
			document.getElementById( "add_process" ).style.display = "block";
		}
		else {
			document.getElementById( "add_process" ).style.display = "none";
		}

		path.innerText = markets[current_parts["CurrentMarket"]]["Market" + current_parts["CurrentMarket"]][0]["Name"]
						+ " / " + channels[current_parts["CurrentChannel"]]["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]["Name"]
						+ " / Процессы";
	}
	else if ( go_to_page == 13 ) {
		var functions = model["Organization"][0]
			["Markets"]
			[current_parts["CurrentMarket"]]["Market" + current_parts["CurrentMarket"]][0]
			["Channels"]
			[current_parts["CurrentChannel"]]["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
			["Processes"]
			[current_parts["CurrentProcess"]]["Processes" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"]][0]
			["Functions"];

		var processes = model["Organization"][0]
			["Markets"][current_parts["CurrentMarket"]]
			["Market" + current_parts["CurrentMarket"]][0]
			["Channels"][current_parts["CurrentChannel"]]
			["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
			["Processes"];

		var channels = model["Organization"][0]
			["Markets"][current_parts["CurrentMarket"]]
			["Market" + current_parts["CurrentMarket"]][0]
			["Channels"];

		back.onclick = function () {
			NextBlock( '12', current_parts['CurrentMarket'] + '-' + current_parts['CurrentChannel'] );
		};

		if ( functions.length == 0 ) {
			document.getElementById( "add_functions" ).style.display = "block";
		}
		else {
			document.getElementById( "add_functions" ).style.display = "none";
		}

		path.innerText = markets[current_parts["CurrentMarket"]]["Market" + current_parts["CurrentMarket"]][0]["Name"]
						+ " / " + channels[current_parts["CurrentChannel"]]["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]["Name"]
						+ " / " + processes[current_parts["CurrentProcess"]]["Processes" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"]][0]["Name"]
						+ " / Функции";
	}
	else if ( go_to_page == 14 ) {
		var operations = model["Organization"][0]
			["Markets"]
			[current_parts["CurrentMarket"]]["Market" + current_parts["CurrentMarket"]][0]
			["Channels"]
			[current_parts["CurrentChannel"]]["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
			["Processes"]
			[current_parts["CurrentProcess"]]["Processes" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"]][0]
			["Functions"]
			[current_parts["CurrentFunction"]]["Functions" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"] + "-" + current_parts["CurrentFunction"]][0]
			["Operations"];

		var processes = model["Organization"][0]
			["Markets"][current_parts["CurrentMarket"]]
			["Market" + current_parts["CurrentMarket"]][0]
			["Channels"][current_parts["CurrentChannel"]]
			["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
			["Processes"];

		var channels = model["Organization"][0]
			["Markets"][current_parts["CurrentMarket"]]
			["Market" + current_parts["CurrentMarket"]][0]
			["Channels"];

		var functions = model["Organization"][0]
			["Markets"]
			[current_parts["CurrentMarket"]]["Market" + current_parts["CurrentMarket"]][0]
			["Channels"]
			[current_parts["CurrentChannel"]]["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
			["Processes"]
			[current_parts["CurrentProcess"]]["Processes" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"]][0]
			["Functions"];

		back.onclick = function () {
			NextBlock( '13', current_parts['CurrentMarket'] + '-' + current_parts['CurrentChannel'] + '-' + current_parts['CurrentProcess'] );
		};

		if ( operations.length == 0 ) {
			document.getElementById( "add_operation" ).style.display = "block";
		}
		else {
			document.getElementById( "add_operation" ).style.display = "none";
		}

		path.innerText = markets[current_parts["CurrentMarket"]]["Market" + current_parts["CurrentMarket"]][0]["Name"]
						+ " / " + channels[current_parts["CurrentChannel"]]["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]["Name"]
						+ " / " + processes[current_parts["CurrentProcess"]]["Processes" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"]][0]["Name"]
						+ " / " + functions[current_parts["CurrentFunction"]]["Functions" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"] + "-" + current_parts["CurrentFunction"]][0]["Name"]
						+ " / Операции";

	}

	if ( path_to_element != "Markets" ) {
		var element = controls[localStorage.getItem( "current" )].firstElementChild.children[1];

		for ( var i = 1; i < element.childElementCount; i++ ) {
			if ( !element.children[i].getAttribute( "parent" ).includes( path_to_element.replace( /[^-0-9-]/gim, '' ) ) ) {
				element.children[i].style.display = "none";
			}
			else {
				element.children[i].style.display = "block";
			}
		}
	}
}

/* Building model elements from click event of each "Add" button in HTML */
function Build( part ) {

	switch ( String( part ) ) {
		case "Market":
			var container = document.getElementById( "Markets_add_place" );

			var table = document.createElement( "table" );
			table.id = "Market" + ( markets.length ).toString();
			table.setAttribute( "parent", current_parts["CurrentMarket"] );

			var first_row = document.createElement( "tr" );
			var second_row = document.createElement( "tr" );

			var first_cell_of_first_row = document.createElement( "td" );
			first_cell_of_first_row.colSpan = 3;
			first_cell_of_first_row.class = "inputs_name";


			var first_cell_of_second_row = document.createElement( "td" );
			var second_cell_of_second_row = document.createElement( "td" );
			var third_cell_of_second_row = document.createElement( "td" );

			var name = document.createElement( "input" );
			name.type = "text";
			name.className = "inputs_name";
			name.placeholder = "Наименование";
			name.id = "Market_name" + ( markets.length ).toString();
			name.onchange = function () {
				TextChange( "Market_name", name );
			};

			var amount = document.createElement( "input" );
			amount.type = "text";
			amount.className = "inputs";
			amount.placeholder = "Объем";
			amount.id = "Market_amount" + ( markets.length ).toString();
			amount.onchange = function () {
				TextChange( "Market_amount", amount );
			};

			var channels = document.createElement( "input" );
			channels.id = "Channels_extend" + ( markets.length ).toString();
			channels.type = "text";
			channels.readOnly = true;
			channels.className = "inputs";
			channels.value = "Каналы сбыта";
			channels.onclick = function () {
				NextBlock( 1, channels.id, 0 );
			};

			var contestors = document.createElement( "input" );
			contestors.id = "Contestors_extend" + ( markets.length ).toString();
			contestors.type = "text";
			contestors.readOnly = true;
			contestors.className = "inputs";
			contestors.value = "Конкуренты";
			contestors.onclick = function () {
				NextBlock( 2, contestors.id, 0 );
			};

			var add_button = document.createElement( "a" );
			add_button.id = "Markets_add_button" + ( markets.length ).toString();
			add_button.className = "add";
			add_button.text = "+";
			add_button.onclick = function () {
				Build( 'Market' );
			};

			var button_to_remove = document.getElementById( "Markets_add_button" + ( markets.length - 1 ).toString() );

			if ( button_to_remove ) {
				button_to_remove.parentElement.removeChild( button_to_remove );
			}


			markets.push( {
                        ["Market" +( markets.length ).toString()]: [{
                        	"ID": "Market" + ( markets.length ).toString(),
                        	"Name": "",
                        	"Amount": "",
                        	"Channels": [],
                        	"Contestors": []
                        }]
			} );

			if ( document.getElementById( "add_market" ).style.display = "block" )
				document.getElementById( "add_market" ).style.display = "none";
			else {
				document.getElementById( "add_market" ).style.display = "block";
			}

			table.appendChild( first_row );
			table.appendChild( second_row );

			first_row.appendChild( first_cell_of_first_row );

			second_row.appendChild( first_cell_of_second_row );
			second_row.appendChild( second_cell_of_second_row );
			second_row.appendChild( third_cell_of_second_row );

			first_cell_of_first_row.appendChild( name );


			first_cell_of_second_row.appendChild( amount );
			second_cell_of_second_row.appendChild( channels );
			third_cell_of_second_row.appendChild( contestors );
			third_cell_of_second_row.appendChild( add_button );

			container.appendChild( table );

			break;

		case "Channel":
			var channels = model["Organization"][0]
				["Markets"][current_parts["CurrentMarket"]]
				["Market" + current_parts["CurrentMarket"]][0]
				["Channels"];

			var container = document.getElementById( "Channels_add_place" );

			var table = document.createElement( "table" );
			table.id = "Channel" + current_parts["CurrentMarket"] + "-" + ( channels.length ).toString();
			table.setAttribute( "parent", current_parts["CurrentMarket"] );

			var first_row = document.createElement( "tr" );
			var second_row = document.createElement( "tr" );
			var third_row = document.createElement( "tr" );
			var fourth_row = document.createElement( "tr" );
			var fifth_row = document.createElement( "tr" );

			var first_cell_of_first_row = document.createElement( "td" );
			first_cell_of_first_row.colSpan = 50;

			var first_cell_of_second_row = document.createElement( "td" );
			first_cell_of_second_row.colSpan = 30;
			var second_cell_of_second_row = document.createElement( "td" );
			second_cell_of_second_row.colSpan = 10;
			var third_cell_of_second_row = document.createElement( "td" );
			third_cell_of_second_row.colSpan = 10;

			var first_cell_of_third_row = document.createElement( "td" );
			first_cell_of_third_row.colSpan = 30;
			var second_cell_of_third_row = document.createElement( "td" );
			second_cell_of_third_row.colSpan = 10;
			var third_cell_of_third_row = document.createElement( "td" );
			third_cell_of_third_row.colSpan = 10;

			var first_cell_of_fourth_row = document.createElement( "td" );
			first_cell_of_fourth_row.colSpan = 35;
			var second_cell_of_fourth_row = document.createElement( "td" );
			second_cell_of_fourth_row.colSpan = 15;

			var name = document.createElement( "input" );
			name.type = "text";
			name.className = "inputs_name";
			name.placeholder = "Наименование";
			name.id = "Channel_name" + current_parts["CurrentMarket"] + "-" + ( channels.length ).toString();
			name.onchange = function () {
				TextChange( "Channel_name", name );
			};

			var goods = document.createElement( "input" );
			goods.id = "Goods_extend" + current_parts["CurrentMarket"] + "-" + ( channels.length ).toString();
			goods.type = "text";
			goods.readOnly = true;
			goods.className = "inputs";
			goods.value = "Товары";
			goods.onclick = function () {
				NextBlock( 3, goods.id, 0 );
			};

			var assets = document.createElement( "input" );
			assets.id = "Assets" + current_parts["CurrentMarket"] + "-" + ( channels.length ).toString();
			assets.type = "text";
			assets.readOnly = true;
			assets.className = "inputs";
			assets.value = "Основные средства";
			assets.onclick = function () {
				NextBlock( 7, assets.id, 0 );
			};

			var positions = document.createElement( "input" );
			positions.id = "Positions" + current_parts["CurrentMarket"] + "-" + ( channels.length ).toString();
			positions.type = "text";
			positions.readOnly = true;
			positions.className = "inputs";
			positions.value = "Должности";
			positions.onclick = function () {
				NextBlock( 8, positions.id, 0 );
			};

			var mbp = document.createElement( "input" );
			mbp.id = "MBP" + current_parts["CurrentMarket"] + "-" + ( channels.length ).toString();
			mbp.type = "text";
			mbp.readOnly = true;
			mbp.className = "inputs";
			mbp.value = "МБП";
			mbp.onclick = function () {
				NextBlock( 9, mbp.id, 0 );
			};

			var electricity = document.createElement( "input" );
			electricity.id = "Electricity" + current_parts["CurrentMarket"] + "-" + ( channels.length ).toString();
			electricity.type = "text";
			electricity.readOnly = true;
			electricity.className = "inputs";
			electricity.value = "Электрооборудование";
			electricity.onclick = function () {
				NextBlock( 10, electricity.id, 0 );
			};

			var rent = document.createElement( "input" );
			rent.id = "Rent" + current_parts["CurrentMarket"] + "-" + ( channels.length ).toString();
			rent.type = "text";
			rent.readOnly = true;
			rent.className = "inputs";
			rent.value = "Арендуемые объекты";
			rent.onclick = function () {
				NextBlock( 11, rent.id, 0 );
			};

			var other = document.createElement( "input" );
			other.type = "text";
			other.className = "inputs";
			other.placeholder = "Прочие затраты";
			other.id = "Other" + ( channels.length ).toString();
			other.onchange = function () {
				TextChange( "Other", other );
			};

			var processes = document.createElement( "input" );
			processes.id = "Processes" + current_parts["CurrentMarket"] + "-" + ( channels.length ).toString();
			processes.type = "text";
			processes.readOnly = true;
			processes.className = "inputs";
			processes.value = "Процессы";
			processes.onclick = function () {
				NextBlock( 12, processes.id, 0 );
			};

			var add_button = document.createElement( "a" );
			add_button.id = "Channels_add_button" + current_parts["Current_Market"] + "-" + ( channels.length ).toString();
			add_button.className = "add";
			add_button.text = "+";
			add_button.onclick = function () {
				Build( 'Channel' );
			};

			var button_to_remove = document.getElementById( "Channels_add_button" + current_parts["Current_Market"] + "-" + ( channels.length - 1 ).toString() );

			if ( button_to_remove ) {
				button_to_remove.parentElement.removeChild( button_to_remove );
			}



			channels.push( {
                        ["Channel" +current_parts["CurrentMarket"]+ "-" +( channels.length ).toString()]: [{
                        	"ID": "Channel" + current_parts["CurrentMarket"] + "-" + ( channels.length ).toString(),
                        	"Name": "",
                        	"Goods": [],
                        	"Assets": [],
                        	"MBP": [],
                        	"Positions": [],
                        	"Electricity": [],
                        	"Rent": [],
                        	"Other": "",
                        	"Processes": []
                        }]
			} );

			if ( document.getElementById( "add_channel" ).style.display = "block" )
				document.getElementById( "add_channel" ).style.display = "none";
			else {
				document.getElementById( "add_channel" ).style.display = "block";
			}

			table.appendChild( first_row );
			table.appendChild( second_row );
			table.appendChild( third_row );
			table.appendChild( fourth_row );

			first_row.appendChild( first_cell_of_first_row );

			second_row.appendChild( first_cell_of_second_row );
			second_row.appendChild( second_cell_of_second_row );
			second_row.appendChild( third_cell_of_second_row );

			third_row.appendChild( first_cell_of_third_row );
			third_row.appendChild( second_cell_of_third_row );
			third_row.appendChild( third_cell_of_third_row );

			fourth_row.appendChild( first_cell_of_fourth_row );
			fourth_row.appendChild( second_cell_of_fourth_row );

			first_cell_of_first_row.appendChild( name );

			first_cell_of_second_row.appendChild( mbp );
			second_cell_of_second_row.appendChild( assets );
			third_cell_of_second_row.appendChild( rent );

			first_cell_of_third_row.appendChild( goods );
			second_cell_of_third_row.appendChild( positions );
			third_cell_of_third_row.appendChild( other );

			first_cell_of_fourth_row.appendChild( electricity );
			second_cell_of_fourth_row.appendChild( processes );
			second_cell_of_fourth_row.appendChild( add_button );
			container.appendChild( table );

			break;

		case "Goods":
			var goods = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Goods"];

			var container = document.getElementById( "Goods_add_place" );

			var table = document.createElement( "table" );
			table.id = "Goods" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( goods.length ).toString();
			table.setAttribute( "parent", current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] );

			var first_row = document.createElement( "tr" );
			var second_row = document.createElement( "tr" );
			var third_row = document.createElement( "tr" );

			var first_cell_of_first_row = document.createElement( "td" );
			first_cell_of_first_row.colSpan = 10;

			var second_cell_of_second_row = document.createElement( "td" );
			second_cell_of_second_row.colSpan = 5;
			var third_cell_of_second_row = document.createElement( "td" );
			third_cell_of_second_row.colSpan = 5;

			var first_cell_of_third_row = document.createElement( "td" );
			first_cell_of_third_row.colSpan = 2;
			var second_cell_of_third_row = document.createElement( "td" );
			second_cell_of_third_row.colSpan = 2;
			var third_cell_of_third_row = document.createElement( "td" );
			third_cell_of_third_row.colSpan = 2;
			var fourth_cell_of_third_row = document.createElement( "td" );
			fourth_cell_of_third_row.colSpan = 2;
			var fifth_cell_of_third_row = document.createElement( "td" );
			fifth_cell_of_third_row.colSpan = 2;

			var name = document.createElement( "input" );
			name.type = "text";
			name.className = "inputs_name";
			name.placeholder = "Наименование";
			name.id = "Goods_name" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( goods.length ).toString();
			name.onchange = function () {
				TextChange( "Goods_name", name );
			};

			var group = document.createElement( "input" );
			group.type = "text";
			group.className = "inputs";
			group.placeholder = "Товарная группа";
			group.id = "Group" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( goods.length ).toString();
			group.onchange = function () {
				TextChange( "Group", group );
			};

			var margin = document.createElement( "input" );
			margin.type = "text";
			margin.className = "inputs";
			margin.placeholder = "Наценка";
			margin.id = "Goods_margin" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( goods.length ).toString();
			margin.onchange = function () {
				TextChange( "Goods_margin", margin );
			};

			var freq_day = document.createElement( "input" );
			freq_day.type = "text";
			freq_day.className = "inputs";
			freq_day.placeholder = "Дневная чп";
			freq_day.id = "Goods_freq_day" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( goods.length ).toString();
			freq_day.onchange = function () {
				TextChange( "Goods_freq_day", freq_day );
			};
			var freq_month = document.createElement( "input" );
			freq_month.type = "text";
			freq_month.className = "inputs";
			freq_month.placeholder = "Месячная чп";
			freq_month.id = "Goods_freq_month" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( goods.length ).toString();
			freq_month.onchange = function () {
				TextChange( "Goods_freq_month", freq_month );
			};
			var freq_week = document.createElement( "input" );
			freq_week.type = "text";
			freq_week.className = "inputs";
			freq_week.placeholder = "Недельная чп";
			freq_week.id = "Goods_freq_week" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( goods.length ).toString();
			freq_week.onchange = function () {
				TextChange( "Goods_freq_week", freq_week );
			};
			var freq_year = document.createElement( "input" );
			freq_year.type = "text";
			freq_year.className = "inputs";
			freq_year.placeholder = "Годовая чп";
			freq_year.id = "Goods_freq_year" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( goods.length ).toString();
			freq_year.onchange = function () {
				TextChange( "Goods_freq_year", freq_year );
			};

			var providers = document.createElement( "input" );
			providers.id = "Providers_extend" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( goods.length ).toString();
			providers.type = "text";
			providers.readOnly = true;
			providers.className = "inputs";
			providers.value = "Поставщики";
			providers.onclick = function () {
				NextBlock( 4, providers.id, 0 );
			};

			var add_button = document.createElement( "a" );
			add_button.id = "Goods_add_button" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( goods.length ).toString();
			add_button.className = "add";
			add_button.text = "+";
			add_button.onclick = function () {
				Build( 'Goods' );
			};

			var button_to_remove = document.getElementById( "Goods_add_button" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( goods.length - 2 ).toString() );

			if ( button_to_remove ) {
				button_to_remove.parentElement.removeChild( button_to_remove );
			}


			goods.push( {
                        ["Goods" +current_parts["CurrentMarket"]+ "-" +current_parts["CurrentChannel"]+ "-" +( goods.length ).toString()]: [{
                        	"ID": "Goods" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( goods.length ).toString(),
                        	"Name": "",
                        	"Margin": "",
                        	"Freq_day": "",
                        	"Freq_week": "",
                        	"Freq_month": "",
                        	"Freq_year": "",
                        	"Group": "",
                        	"Providers": [],
                        	"Resources": []
                        }]
			} );

			if ( document.getElementById( "add_goods" ).style.display = "block" )
				document.getElementById( "add_goods" ).style.display = "none";
			else {
				document.getElementById( "add_goods" ).style.display = "block";
			}

			table.appendChild( first_row );
			table.appendChild( second_row );
			table.appendChild( third_row );

			first_row.appendChild( first_cell_of_first_row );

			second_row.appendChild( second_cell_of_second_row );
			second_row.appendChild( third_cell_of_second_row );

			third_row.appendChild( first_cell_of_third_row );
			third_row.appendChild( second_cell_of_third_row );
			third_row.appendChild( third_cell_of_third_row );
			third_row.appendChild( fourth_cell_of_third_row );
			third_row.appendChild( fifth_cell_of_third_row );

			first_cell_of_first_row.appendChild( name );

			second_cell_of_second_row.appendChild( providers );
			third_cell_of_second_row.appendChild( group );

			first_cell_of_third_row.appendChild( margin );
			second_cell_of_third_row.appendChild( freq_day );
			third_cell_of_third_row.appendChild( freq_week );
			fourth_cell_of_third_row.appendChild( freq_month );
			fifth_cell_of_third_row.appendChild( freq_year );
			fifth_cell_of_third_row.appendChild( add_button );

			container.appendChild( table );

			break;

		case "Provider":
			var provider = model
                ["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Goods"][current_parts["CurrentGoods"]]
                ["Goods" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentGoods"]][0]["Providers"];

			var container = document.getElementById( "Providers_add_place" );

			var table = document.createElement( "table" );
			table.id = "Provider" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentGoods"] + "-" + ( provider.length ).toString();
			table.setAttribute( "parent", current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentGoods"] );

			var first_row = document.createElement( "tr" );
			var second_row = document.createElement( "tr" );

			var first_cell_of_first_row = document.createElement( "td" );
			var first_cell_of_second_row = document.createElement( "td" );

			var name = document.createElement( "input" );
			name.type = "text";
			name.className = "inputs_name";
			name.placeholder = "Наименование";
			name.id = "Provider_name" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentGoods"] + "-" + ( provider.length ).toString();
			name.onchange = function () {
				TextChange( "Provider_name", name );
			};

			var price = document.createElement( "input" );
			price.type = "text";
			price.className = "inputs";
			price.placeholder = "Цена";
			price.id = "Provider_price" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentGoods"] + "-" + ( provider.length ).toString();
			price.onchange = function () {
				TextChange( "Provider_price", price );
			};

			var add_button = document.createElement( "a" );
			add_button.id = "Provider_add_button" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentGoods"] + "-" + ( provider.length ).toString();
			add_button.className = "add";
			add_button.text = "+";
			add_button.onclick = function () {
				Build( 'Provider' );
			};

			var button_to_remove = document.getElementById( "Provider_add_button" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentGoods"] + "-" + ( provider.length - 1 ).toString() );

			if ( button_to_remove ) {
				button_to_remove.parentElement.removeChild( button_to_remove );
			}


			provider.push( {
                        ["Provider" +current_parts["CurrentMarket"]+ "-" +current_parts["CurrentChannel"]+ "-" +current_parts["CurrentGoods"]+ "-" +( provider.length ).toString()]: [{
                        	"ID": "Provider" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentGoods"] + "-" + ( provider.length ).toString(),
                        	"Name": "",
                        	"Price": "",
                        	"Amount": ""
                        }]
			} );

			if ( document.getElementById( "add_provider" ).style.display = "block" )
				document.getElementById( "add_provider" ).style.display = "none";
			else {
				document.getElementById( "add_provider" ).style.display = "block";
			}

			table.appendChild( first_row );
			table.appendChild( second_row );

			first_row.appendChild( first_cell_of_first_row );
			second_row.appendChild( first_cell_of_second_row );

			first_cell_of_first_row.appendChild( name );
			first_cell_of_second_row.appendChild( price );
			first_cell_of_second_row.appendChild( add_button );
			container.appendChild( table );

			break;

		case "Contestor":
			var contestor = model
               ["Organization"][0]
               ["Markets"][current_parts["CurrentMarket"]]
               ["Market" + current_parts["CurrentMarket"]][0]
               ["Contestors"];

			var container = document.getElementById( "Contestors_add_place" );

			var table = document.createElement( "table" );
			table.id = "Contestor" + current_parts["CurrentMarket"] + "-" + ( contestor.length ).toString();
			table.setAttribute( "parent", current_parts["CurrentMarket"] );

			var first_row = document.createElement( "tr" );
			var second_row = document.createElement( "tr" );

			var first_cell_of_first_row = document.createElement( "td" );
			var first_cell_of_second_row = document.createElement( "td" );

			var name = document.createElement( "input" );
			name.type = "text";
			name.className = "inputs_name";
			name.placeholder = "Наименование";
			name.id = "Contestor_name" + current_parts["CurrentMarket"] + "-" + ( contestor.length ).toString();
			name.onchange = function () {
				TextChange( "Contestor_name", name );
			};

			var goods = document.createElement( "input" );
			goods.id = "Cont_goods" + current_parts["CurrentMarket"] + "-" + ( contestor.length ).toString();
			goods.type = "text";
			goods.readOnly = true;
			goods.className = "inputs";
			goods.value = "Ценностные предложения";
			goods.onclick = function () {
				NextBlock( 6, goods.id, 0 );
			};

			var add_button = document.createElement( "a" );
			add_button.id = "Contestor_add_button" + current_parts["CurrentMarket"] + "-" + ( contestor.length ).toString();
			add_button.className = "add";
			add_button.text = "+";
			add_button.onclick = function () {
				Build( 'Contestor' );
			};

			var button_to_remove = document.getElementById( "Contestor_add_button" + current_parts["CurrentMarket"] + "-" + ( contestor.length - 1 ).toString() );

			if ( button_to_remove ) {
				button_to_remove.parentElement.removeChild( button_to_remove );
			}


			contestor.push( {
                        ["Contestor" +current_parts["CurrentMarket"]+ "-" +( contestor.length ).toString()]: [{
                        	"ID": "Contestor" + current_parts["CurrentMarket"] + "-" + ( contestor.length ).toString(),
                        	"Name": "",
                        	"Loyalty": "",
                        	"Goods": []
                        }]
			} );

			if ( document.getElementById( "add_contestor" ).style.display = "block" )
				document.getElementById( "add_contestor" ).style.display = "none";
			else {
				document.getElementById( "add_contestor" ).style.display = "block";
			}

			table.appendChild( first_row );
			table.appendChild( second_row );

			first_row.appendChild( first_cell_of_first_row );
			second_row.appendChild( first_cell_of_second_row );

			first_cell_of_first_row.appendChild( name );
			first_cell_of_second_row.appendChild( goods );
			first_cell_of_second_row.appendChild( add_button );

			container.appendChild( table );

			break;

		case "Cont_goods":
			var contestor_goods = model
               ["Organization"][0]
               ["Markets"][current_parts["CurrentMarket"]]
               ["Market" + current_parts["CurrentMarket"]][0]
               ["Contestors"][current_parts["CurrentContestor"]]
               ["Contestor" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentContestor"]][0]["Goods"];

			var container = document.getElementById( "Cont_goods_add_place" );

			var table = document.createElement( "table" );
			table.id = "Goods" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentContestor"] + "-" + ( contestor_goods.length ).toString();
			table.setAttribute( "parent", current_parts["CurrentMarket"] + "-" + current_parts["CurrentContestor"] + "-" + current_parts["CurrentContestor"] );

			var first_row = document.createElement( "tr" );
			var second_row = document.createElement( "tr" );

			var first_cell_of_first_row = document.createElement( "td" );
			var first_cell_of_second_row = document.createElement( "td" );

			var name = document.createElement( "input" );
			name.type = "text";
			name.className = "inputs_name";
			name.placeholder = "Наименование";
			name.id = "Contestor_good_name" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentContestor"] + "-" + ( contestor_goods.length ).toString();
			name.onchange = function () {
				TextChange( "Contestor_good_name", name );
			};

			var price = document.createElement( "input" );
			price.type = "text";
			price.className = "inputs";
			price.placeholder = "Цена";
			price.id = "Contestor_price" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentContestor"] + "-" + ( contestor_goods.length ).toString();
			price.onchange = function () {
				TextChange( "Contestor_good_price", price );
			};

			var add_button = document.createElement( "a" );
			add_button.id = "Contestor_good_add_button" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentContestor"] + "-" + ( contestor_goods.length ).toString();
			add_button.className = "add";
			add_button.text = "+";
			add_button.onclick = function () {
				Build( 'Cont_goods' );
			};

			var button_to_remove = document.getElementById( "Contestor_good_add_button" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentContestor"] + "-" + ( contestor_goods.length - 1 ).toString() );

			if ( button_to_remove ) {
				button_to_remove.parentElement.removeChild( button_to_remove );
			}


			contestor_goods.push( {
                        ["Goods" +current_parts["CurrentMarket"]+ "-" +current_parts["CurrentContestor"]+ "-" +( contestor_goods.length ).toString()]: [{
                        	"ID": "Goods" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentContestor"] + "-" + ( contestor_goods.length ).toString(),
                        	"Name": "",
                        	"Price": ""
                        }]
			} );

			if ( document.getElementById( "add_cont_goods" ).style.display = "block" )
				document.getElementById( "add_cont_goods" ).style.display = "none";
			else {
				document.getElementById( "add_cont_goods" ).style.display = "block";
			}

			table.appendChild( first_row );
			table.appendChild( second_row );

			first_row.appendChild( first_cell_of_first_row );
			second_row.appendChild( first_cell_of_second_row );

			first_cell_of_first_row.appendChild( name );
			first_cell_of_second_row.appendChild( price );
			first_cell_of_second_row.appendChild( add_button );

			container.appendChild( table );

			break;

		case "Assets":
			var assets = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Assets"];

			var container = document.getElementById( "fixed_assets_add_place" );

			var table = document.createElement( "table" );
			table.id = "Assets" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( assets.length ).toString();
			table.setAttribute( "parent", current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] );

			var first_row = document.createElement( "tr" );
			var second_row = document.createElement( "tr" );

			var first_cell_of_first_row = document.createElement( "td" );
			first_cell_of_first_row.colSpan = 2;

			var first_cell_of_second_row = document.createElement( "td" );
			var second_cell_of_second_row = document.createElement( "td" );

			var name = document.createElement( "input" );
			name.type = "text";
			name.className = "inputs_name";
			name.placeholder = "Наименование";
			name.id = "Goods_name" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( assets.length ).toString();
			name.onchange = function () {
				TextChange( "Assets_name", name );
			};

			var price = document.createElement( "input" );
			price.type = "text";
			price.className = "inputs";
			price.placeholder = "Стоимость";
			price.id = "Price" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( assets.length ).toString();
			price.onchange = function () {
				TextChange( "Assets_Price", price );
			};

			var useful_life = document.createElement( "input" );
			useful_life.type = "text";
			useful_life.className = "inputs";
			useful_life.placeholder = "Срок пол. исп.";
			useful_life.id = "Useful_life" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( assets.length ).toString();
			useful_life.onchange = function () {
				TextChange( "Useful_life", useful_life );
			};

			var add_button = document.createElement( "a" );
			add_button.id = "Assets_add_button" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( assets.length ).toString();
			add_button.className = "add";
			add_button.text = "+";
			add_button.onclick = function () {
				Build( 'Assets' );
			};

			var button_to_remove = document.getElementById( "Assets_add_button" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( assets.length - 1 ).toString() );

			if ( button_to_remove ) {
				button_to_remove.parentElement.removeChild( button_to_remove );
			}


			assets.push( {
                        ["Assets" +current_parts["CurrentMarket"]+ "-" +current_parts["CurrentChannel"]+ "-" +( assets.length ).toString()]: [{
                        	"ID": "Assets" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( assets.length ).toString(),
                        	"Name": "",
                        	"Price": "",
                        	"Useful_life": ""
                        }]
			} );

			if ( document.getElementById( "add_assets" ).style.display = "block" )
				document.getElementById( "add_assets" ).style.display = "none";
			else {
				document.getElementById( "add_assets" ).style.display = "block";
			}

			table.appendChild( first_row );
			table.appendChild( second_row );

			first_row.appendChild( first_cell_of_first_row );
			second_row.appendChild( first_cell_of_second_row );
			second_row.appendChild( second_cell_of_second_row );

			first_cell_of_first_row.appendChild( name );
			first_cell_of_second_row.appendChild( price );
			second_cell_of_second_row.appendChild( useful_life );
			second_cell_of_second_row.appendChild( add_button );

			container.appendChild( table );

			break;

		case "Positions":
			var positions = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Positions"];

			var container = document.getElementById( "position_add_place" );

			var table = document.createElement( "table" );
			table.id = "Positions" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( positions.length ).toString();
			table.setAttribute( "parent", current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] );

			var first_row = document.createElement( "tr" );
			var second_row = document.createElement( "tr" );

			var first_cell_of_first_row = document.createElement( "td" );
			first_cell_of_first_row.colSpan = 3;

			var first_cell_of_second_row = document.createElement( "td" );
			var second_cell_of_second_row = document.createElement( "td" );
			var third_cell_of_second_row = document.createElement( "td" );

			var name = document.createElement( "input" );
			name.type = "text";
			name.className = "inputs_name";
			name.placeholder = "Наименование";
			name.id = "Position_name" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( positions.length ).toString();
			name.onchange = function () {
				TextChange( "Position_name", name );
			};

			var rate = document.createElement( "input" );
			rate.type = "text";
			rate.className = "inputs";
			rate.placeholder = "Ставка";
			rate.id = "Rate" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( positions.length ).toString();
			rate.onchange = function () {
				TextChange( "Position_rate", rate );
			};

			var salary = document.createElement( "input" );
			salary.type = "text";
			salary.className = "inputs";
			salary.placeholder = "Оклад";
			salary.id = "Salary" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( positions.length ).toString();
			salary.onchange = function () {
				TextChange( "Position_salary", salary );
			};

			var addition = document.createElement( "input" );
			addition.type = "text";
			addition.className = "inputs";
			addition.placeholder = "Процент доплат";
			addition.id = "Add" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( positions.length ).toString();
			addition.onchange = function () {
				TextChange( "Position_add", addition );
			};

			var add_button = document.createElement( "a" );
			add_button.id = "Positions_add_button" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( positions.length ).toString();
			add_button.className = "add";
			add_button.text = "+";
			add_button.onclick = function () {
				Build( 'Positions' );
			};

			var button_to_remove = document.getElementById( "Positions_add_button" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( positions.length - 1 ).toString() );

			if ( button_to_remove ) {
				button_to_remove.parentElement.removeChild( button_to_remove );
			}


			positions.push( {
                        ["Positions" +current_parts["CurrentMarket"]+ "-" +current_parts["CurrentChannel"]+ "-" +( positions.length ).toString()]: [{
                        	"ID": "Positions" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( positions.length ).toString(),
                        	"Name": "",
                        	"Rate": "",
                        	"Salary": ""
                        }]
			} );

			if ( document.getElementById( "add_position" ).style.display = "block" )
				document.getElementById( "add_position" ).style.display = "none";
			else {
				document.getElementById( "add_position" ).style.display = "block";
			}

			table.appendChild( first_row );
			table.appendChild( second_row );

			first_row.appendChild( first_cell_of_first_row );

			second_row.appendChild( first_cell_of_second_row );
			second_row.appendChild( second_cell_of_second_row );
			second_row.appendChild( third_cell_of_second_row );

			first_cell_of_first_row.appendChild( name );

			first_cell_of_second_row.appendChild( rate );
			second_cell_of_second_row.appendChild( salary );
			third_cell_of_second_row.appendChild( addition );
			third_cell_of_second_row.appendChild( add_button );

			container.appendChild( table );

			break;

		case "MBP":
			var mbp = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["MBP"];

			var container = document.getElementById( "mbp_add_place" );

			var table = document.createElement( "table" );
			table.id = "MBP" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( mbp.length ).toString();
			table.setAttribute( "parent", current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] );

			var first_row = document.createElement( "tr" );
			var second_row = document.createElement( "tr" );

			var first_cell_of_first_row = document.createElement( "td" );
			first_cell_of_first_row.colSpan = 2;

			var first_cell_of_second_row = document.createElement( "td" );
			var second_cell_of_second_row = document.createElement( "td" );

			var name = document.createElement( "input" );
			name.type = "text";
			name.className = "inputs_name";
			name.placeholder = "Наименование";
			name.id = "MBP_name" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( mbp.length ).toString();
			name.onchange = function () {
				TextChange( "MBP_name", name );
			};

			var price = document.createElement( "input" );
			price.type = "text";
			price.className = "inputs";
			price.placeholder = "Стоимость";
			price.id = "MBP_Price" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( mbp.length ).toString();
			price.onchange = function () {
				TextChange( "MBP_Price", price );
			};

			var amount = document.createElement( "input" );
			amount.type = "text";
			amount.className = "inputs";
			amount.placeholder = "Количество";
			amount.id = "MBP_amount" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( mbp.length ).toString();
			amount.onchange = function () {
				TextChange( "MBP_amount", amount );
			};

			var add_button = document.createElement( "a" );
			add_button.id = "mbp_add_button" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( mbp.length ).toString();
			add_button.className = "add";
			add_button.text = "+";
			add_button.onclick = function () {
				Build( 'MBP' );
			};

			var button_to_remove = document.getElementById( "mbp_add_button" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( mbp.length - 1 ).toString() );

			if ( button_to_remove ) {
				button_to_remove.parentElement.removeChild( button_to_remove );
			}


			mbp.push( {
                        ["MBP" +current_parts["CurrentMarket"]+ "-" +current_parts["CurrentChannel"]+ "-" +( mbp.length ).toString()]: [{
                        	"ID": "MBP" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( mbp.length ).toString(),
                        	"Name": "",
                        	"Price": "",
                        	"Amount": ""
                        }]
			} );

			if ( document.getElementById( "add_mbp" ).style.display = "block" )
				document.getElementById( "add_mbp" ).style.display = "none";
			else {
				document.getElementById( "add_mbp" ).style.display = "block";
			}

			table.appendChild( first_row );
			table.appendChild( second_row );

			first_row.appendChild( first_cell_of_first_row );

			second_row.appendChild( first_cell_of_second_row );
			second_row.appendChild( second_cell_of_second_row );

			first_cell_of_first_row.appendChild( name );

			first_cell_of_second_row.appendChild( price );
			second_cell_of_second_row.appendChild( amount );
			second_cell_of_second_row.appendChild( add_button );

			container.appendChild( table );

			break;


		case "Electricity":
			var electricity = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Electricity"];

			var container = document.getElementById( "electricity_add_place" );

			var table = document.createElement( "table" );
			table.id = "Electricity" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( electricity.length ).toString();
			table.setAttribute( "parent", current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] );

			var first_row = document.createElement( "tr" );
			var second_row = document.createElement( "tr" );

			var first_cell_of_first_row = document.createElement( "td" );
			first_cell_of_first_row.colSpan = 4;

			var first_cell_of_second_row = document.createElement( "td" );
			var second_cell_of_second_row = document.createElement( "td" );
			var third_cell_of_second_row = document.createElement( "td" );
			var fourth_cell_of_second_row = document.createElement( "td" );

			var name = document.createElement( "input" );
			name.type = "text";
			name.className = "inputs_name";
			name.placeholder = "Наименование";
			name.id = "Electricity_name" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( electricity.length ).toString();
			name.onchange = function () {
				TextChange( "Electricity_name", name );
			};

			var power = document.createElement( "input" );
			power.type = "text";
			power.className = "inputs";
			power.placeholder = "Мощность";
			power.id = "Power" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( electricity.length ).toString();
			power.onchange = function () {
				TextChange( "Power", power );
			};

			var amount = document.createElement( "input" );
			amount.type = "text";
			amount.className = "inputs";
			amount.placeholder = "Количество";
			amount.id = "Electricity_amount" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( electricity.length ).toString();
			amount.onchange = function () {
				TextChange( "Electricity_amount", amount );
			};

			var time = document.createElement( "input" );
			time.type = "text";
			time.className = "inputs";
			time.placeholder = "Время работы";
			time.id = "Electricity_time" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( electricity.length ).toString();
			time.onchange = function () {
				TextChange( "Electricity_time", time );
			};

			var el_rate = document.createElement( "input" );
			el_rate.type = "text";
			el_rate.className = "inputs";
			el_rate.placeholder = "Тариф";
			el_rate.id = "Electricity_rate" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( electricity.length ).toString();
			el_rate.onchange = function () {
				TextChange( "Electricity_rate", el_rate );
			};

			var add_button = document.createElement( "a" );
			add_button.id = "Electricity_add_button" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( electricity.length ).toString();
			add_button.className = "add";
			add_button.text = "+";
			add_button.onclick = function () {
				Build( 'Electricity' );
			};

			var button_to_remove = document.getElementById( "Electricity_add_button" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( electricity.length - 1 ).toString() );

			if ( button_to_remove ) {
				button_to_remove.parentElement.removeChild( button_to_remove );
			}


			electricity.push( {
                        ["Electricity" +current_parts["CurrentMarket"]+ "-" +current_parts["CurrentChannel"]+ "-" +( electricity.length ).toString()]: [{
                        	"ID": "Electricity" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( electricity.length ).toString(),
                        	"Name": "",
                        	"Power": "",
                        	"Amount": "",
                        	"Time": "",
							"Rate":""
                        }]
			} );

			if ( document.getElementById( "add_elect" ).style.display = "block" )
				document.getElementById( "add_elect" ).style.display = "none";
			else {
				document.getElementById( "add_elect" ).style.display = "block";
			}

			table.appendChild( first_row );
			table.appendChild( second_row );

			first_row.appendChild( first_cell_of_first_row );

			second_row.appendChild( first_cell_of_second_row );
			second_row.appendChild( second_cell_of_second_row );
			second_row.appendChild( third_cell_of_second_row );
			second_row.appendChild( fourth_cell_of_second_row );
			first_cell_of_first_row.appendChild( name );

			first_cell_of_second_row.appendChild( power );
			second_cell_of_second_row.appendChild( amount );
			third_cell_of_second_row.appendChild( time );
			fourth_cell_of_second_row.appendChild( el_rate );
			fourth_cell_of_second_row.appendChild( add_button );

			container.appendChild( table );

			break;

		case "Rent":
			var rent = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Rent"];

			var container = document.getElementById( "rent_add_place" );

			var table = document.createElement( "table" );
			table.id = "Rent" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( rent.length ).toString();
			table.setAttribute( "parent", current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] );

			var first_row = document.createElement( "tr" );
			var second_row = document.createElement( "tr" );

			var first_cell_of_first_row = document.createElement( "td" );
			first_cell_of_first_row.colSpan = 3;

			var first_cell_of_second_row = document.createElement( "td" );
			var second_cell_of_second_row = document.createElement( "td" );
			var third_cell_of_second_row = document.createElement( "td" );

			var name = document.createElement( "input" );
			name.type = "text";
			name.className = "inputs_name";
			name.placeholder = "Наименование";
			name.id = "Rent_name" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( rent.length ).toString();
			name.onchange = function () {
				TextChange( "Rent_name", name );
			};

			var price = document.createElement( "input" );
			price.type = "text";
			price.className = "inputs";
			price.placeholder = "Стоимость";
			price.id = "Rent_Price" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( rent.length ).toString();
			price.onchange = function () {
				TextChange( "Rent_Price", price );
			};

			var amount = document.createElement( "input" );
			amount.type = "text";
			amount.className = "inputs";
			amount.placeholder = "Количество";
			amount.id = "Rent_amount" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( rent.length ).toString();
			amount.onchange = function () {
				TextChange( "Rent_amount", amount );
			};

			var time = document.createElement( "input" );
			time.type = "text";
			time.className = "inputs";
			time.placeholder = "Срок аренды";
			time.id = "Rent_time" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( rent.length ).toString();
			time.onchange = function () {
				TextChange( "Rent_time", amount );
			};

			var add_button = document.createElement( "a" );
			add_button.id = "Rent_add_button" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( rent.length ).toString();
			add_button.className = "add";
			add_button.text = "+";
			add_button.onclick = function () {
				Build( 'Rent' );
			};

			var button_to_remove = document.getElementById( "Rent_add_button" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( rent.length - 1 ).toString() );

			if ( button_to_remove ) {
				button_to_remove.parentElement.removeChild( button_to_remove );
			}


			rent.push( {
                        ["Rent" +current_parts["CurrentMarket"]+ "-" +current_parts["CurrentChannel"]+ "-" +( rent.length ).toString()]: [{
                        	"ID": "Rent" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( rent.length ).toString(),
                        	"Name": "",
                        	"Price": "",
                        	"Amount": "",
                        	"Time": ""
                        }]
			} );
			if ( document.getElementById( "add_rent" ).style.display = "block" )
				document.getElementById( "add_rent" ).style.display = "none";
			else {
				document.getElementById( "add_rent" ).style.display = "block";
			}

			table.appendChild( first_row );
			table.appendChild( second_row );

			first_row.appendChild( first_cell_of_first_row );

			second_row.appendChild( first_cell_of_second_row );
			second_row.appendChild( second_cell_of_second_row );
			second_row.appendChild( third_cell_of_second_row );

			first_cell_of_first_row.appendChild( name );

			first_cell_of_second_row.appendChild( price );
			second_cell_of_second_row.appendChild( amount );
			third_cell_of_second_row.appendChild( time );
			third_cell_of_second_row.appendChild( add_button );

			container.appendChild( table );

			break;

		case "Processes":
			var processes = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Processes"];

			var container = document.getElementById( "processes_add_place" );

			var table = document.createElement( "table" );
			table.id = "Processes" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( processes.length ).toString();
			table.setAttribute( "parent", current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] );

			var first_row = document.createElement( "tr" );
			var second_row = document.createElement( "tr" );
			var third_row = document.createElement( "tr" );

			var first_cell_of_first_row = document.createElement( "td" );
			first_cell_of_first_row.colSpan = 2;

			var first_cell_of_second_row = document.createElement( "td" );
			var second_cell_of_second_row = document.createElement( "td" );

			var first_cell_of_third_row = document.createElement( "td" );
			var second_cell_of_third_row = document.createElement( "td" );

			var name = document.createElement( "input" );
			name.type = "text";
			name.className = "inputs_name";
			name.placeholder = "Наименование";
			name.id = "Process_name" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( processes.length ).toString();
			name.onchange = function () {
				TextChange( "Process_name", name );
			};

			var duration = document.createElement( "input" );
			duration.type = "text";
			duration.className = "inputs";
			duration.placeholder = "Продолжительность";
			duration.id = "Process_duration" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( processes.length ).toString();
			duration.onchange = function () {
				TextChange( "Process_duration", duration );
			};

			var periodicity = document.createElement( "input" );
			periodicity.type = "text";
			periodicity.className = "inputs";
			periodicity.placeholder = "Периодичность";
			periodicity.id = "Process_periodicity" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( processes.length ).toString();
			periodicity.onchange = function () {
				TextChange( "Process_periodicity", periodicity );
			};

			var effort = document.createElement( "input" );
			effort.type = "text";
			effort.className = "inputs";
			effort.placeholder = "Трудозатратность";
			effort.id = "Process_effort" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( processes.length ).toString();
			effort.onchange = function () {
				TextChange( "Process_effort", effort );
			};

			var functions = document.createElement( "input" );
			functions.type = "text";
			functions.className = "inputs";
			functions.readOnly = true;
			functions.value = "Функции";
			functions.id = "Process_functions" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( processes.length ).toString();
			functions.onclick = function () {
				NextBlock( 13, functions.id, 0 );
			};

			var add_button = document.createElement( "a" );
			add_button.id = "Process_add_button" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( processes.length ).toString();
			add_button.className = "add";
			add_button.text = "+";
			add_button.onclick = function () {
				Build( 'Processes' );
			};

			var button_to_remove = document.getElementById( "Process_add_button" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( processes.length - 1 ).toString() );

			if ( button_to_remove ) {
				button_to_remove.parentElement.removeChild( button_to_remove );
			}

			processes.push( {
                        ["Processes" +current_parts["CurrentMarket"]+ "-" +current_parts["CurrentChannel"]+ "-" +( processes.length ).toString()]: [{
                        	"ID": "Processes" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( processes.length ).toString(),
							"Name" : "",
                        	"Duration": "",
                        	"Effort": "",
                        	"Periodicity": "",
                        	"Functions": []
                        }]
			} );

			if ( document.getElementById( "add_process" ).style.display = "block" )
				document.getElementById( "add_process" ).style.display = "none";
			else {
				document.getElementById( "add_process" ).style.display = "block";
			}


			table.appendChild( first_row );
			table.appendChild( second_row );
			table.appendChild( third_row );

			first_row.appendChild( first_cell_of_first_row );

			second_row.appendChild( first_cell_of_second_row );
			second_row.appendChild( second_cell_of_second_row );

			third_row.appendChild( first_cell_of_third_row );
			third_row.appendChild( second_cell_of_third_row );

			first_cell_of_first_row.appendChild( name );

			first_cell_of_second_row.appendChild( duration );
			second_cell_of_second_row.appendChild( effort );

			first_cell_of_third_row.appendChild( periodicity );
			second_cell_of_third_row.appendChild( functions );
			second_cell_of_third_row.appendChild( add_button );
			container.appendChild( table );

			break;

		case "Functions":
			var functions = model["Organization"][0]
                ["Markets"]
				[current_parts["CurrentMarket"]]["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"]
				[current_parts["CurrentChannel"]]["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Processes"]
				[current_parts["CurrentProcess"]]["Processes" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"]][0]
				["Functions"];

			var container = document.getElementById( "function_add_place" );

			var table = document.createElement( "table" );
			table.id = "Functions" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"] + "-" + ( functions.length ).toString();
			table.setAttribute( "parent", current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"] );

			var first_row = document.createElement( "tr" );
			var second_row = document.createElement( "tr" );
			var third_row = document.createElement( "tr" );

			var first_cell_of_first_row = document.createElement( "td" );
			first_cell_of_first_row.colSpan = 3;

			var first_cell_of_second_row = document.createElement( "td" );
			var second_cell_of_second_row = document.createElement( "td" );

			var first_cell_of_third_row = document.createElement( "td" );
			var second_cell_of_third_row = document.createElement( "td" );

			var name = document.createElement( "input" );
			name.type = "text";
			name.className = "inputs_name";
			name.placeholder = "Наименование";
			name.id = "Functions_name" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( functions.length ).toString();
			name.onchange = function () {
				TextChange( "Functions_name", name );
			};

			var duration = document.createElement( "input" );
			duration.type = "text";
			duration.className = "inputs";
			duration.placeholder = "Продолжительность";
			duration.id = "Function_duration" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"] + "-" + ( functions.length ).toString();
			duration.onchange = function () {
				TextChange( "Function_duration", duration );
			};

			var periodicity = document.createElement( "input" );
			periodicity.type = "text";
			periodicity.className = "inputs";
			periodicity.placeholder = "Периодичность";
			periodicity.id = "Function_periodicity" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"] + "-" + ( functions.length ).toString();
			periodicity.onchange = function () {
				TextChange( "Function_periodicity", periodicity );
			};

			var effort = document.createElement( "input" );
			effort.type = "text";
			effort.className = "inputs";
			effort.placeholder = "Трудозатратность";
			effort.id = "Function_effort" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"] + "-" + ( functions.length ).toString();
			effort.onchange = function () {
				TextChange( "Function_effort", effort );
			};

			var operations = document.createElement( "input" );
			operations.type = "text";
			operations.className = "inputs";
			operations.readOnly = true;
			operations.value = "Операции";
			operations.id = "Function_functions" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"] + "-" + ( functions.length ).toString();
			operations.onclick = function () {
				NextBlock( 14, operations.id, 0 );
			};

			var add_button = document.createElement( "a" );
			add_button.id = "Functions_add_button" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"] + "-" + ( functions.length ).toString();
			add_button.className = "add";
			add_button.text = "+";
			add_button.onclick = function () {
				Build( 'Functions' );
			};

			var button_to_remove = document.getElementById( "Functions_add_button" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"] + "-" + ( functions.length - 1 ).toString() );

			if ( button_to_remove ) {
				button_to_remove.parentElement.removeChild( button_to_remove );
			}

			functions.push( {
                        ["Functions" +current_parts["CurrentMarket"]+ "-" +current_parts["CurrentChannel"]+ "-" +current_parts["CurrentProcess"]+ "-" +( functions.length ).toString()]: [{
                        	"ID": "Functions" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"] + "-" + ( functions.length ).toString(),
							"Name" : "",
                        	"Duration": "",
                        	"Effort": "",
                        	"Periodicity": "",
                        	"Operations": []
                        }]
			} );

			if ( document.getElementById( "add_functions" ).style.display = "block" )
				document.getElementById( "add_functions" ).style.display = "none";
			else {
				document.getElementById( "add_functions" ).style.display = "block";
			}

			table.appendChild( first_row );
			table.appendChild( second_row );
			table.appendChild( third_row );

			first_row.appendChild( first_cell_of_first_row );

			second_row.appendChild( first_cell_of_second_row );
			second_row.appendChild( second_cell_of_second_row );

			third_row.appendChild( first_cell_of_third_row );
			third_row.appendChild( second_cell_of_third_row );

			first_cell_of_first_row.appendChild( name );

			first_cell_of_second_row.appendChild( duration );
			second_cell_of_second_row.appendChild( effort );

			first_cell_of_third_row.appendChild( periodicity );
			second_cell_of_third_row.appendChild( operations );
			second_cell_of_third_row.appendChild( add_button );

			container.appendChild( table );

			break;


		case "Operations":
			var operations = model["Organization"][0]
                ["Markets"]
				[current_parts["CurrentMarket"]]["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"]
				[current_parts["CurrentChannel"]]["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Processes"]
				[current_parts["CurrentProcess"]]["Processes" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"]][0]
				["Functions"]
				[current_parts["CurrentFunction"]]["Functions" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"] + "-" + current_parts["CurrentFunction"]][0]
				["Operations"];

			var container = document.getElementById( "operations_add_place" );

			var table = document.createElement( "table" );
			table.id = "Operations" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"] + "-" + current_parts["CurrentFunction"] + "-" + ( operations.length ).toString();
			table.setAttribute( "parent", current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"] + "-" + current_parts["CurrentFunction"] );

			var first_row = document.createElement( "tr" );
			var second_row = document.createElement( "tr" );
			var third_row = document.createElement( "tr" );

			var first_cell_of_first_row = document.createElement( "td" );
			first_cell_of_first_row.colSpan = 2;

			var first_cell_of_second_row = document.createElement( "td" );
			var second_cell_of_second_row = document.createElement( "td" );

			var first_cell_of_third_row = document.createElement( "td" );
			first_cell_of_third_row.colSpan = 2;

			var name = document.createElement( "input" );
			name.type = "text";
			name.className = "inputs_name";
			name.placeholder = "Наименование";
			name.id = "Process_name" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + ( operations.length ).toString();
			name.onchange = function () {
				TextChange( "Operations_name", name );
			};

			var duration = document.createElement( "input" );
			duration.type = "text";
			duration.className = "inputs";
			duration.placeholder = "Продолжительность";
			duration.id = "Operation_duration" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"] + "-" + current_parts["CurrentFunction"] + "-" + ( operations.length ).toString();
			duration.onchange = function () {
				TextChange( "Operation_duration", duration );
			};

			var periodicity = document.createElement( "input" );
			periodicity.type = "text";
			periodicity.className = "inputs";
			periodicity.placeholder = "Периодичность";
			periodicity.id = "Operation_periodicity" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"] + "-" + current_parts["CurrentFunction"] + "-" + ( operations.length ).toString();
			periodicity.onchange = function () {
				TextChange( "Operation_periodicity", periodicity );
			};

			var effort = document.createElement( "input" );
			effort.type = "text";
			effort.className = "inputs";
			effort.placeholder = "Трудозатратность";
			effort.id = "Operation_effort" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"] + "-" + current_parts["CurrentFunction"] + "-" + ( operations.length ).toString();
			effort.onchange = function () {
				TextChange( "Operation_effort", effort );
			};

			var add_button = document.createElement( "a" );
			add_button.id = "Operations_add_button" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"] + "-" + current_parts["CurrentFunction"] + "-" + ( operations.length ).toString();
			add_button.className = "add";
			add_button.text = "+";
			add_button.onclick = function () {
				Build( 'Operations' );
			};

			var button_to_remove = document.getElementById( "Operations_add_button" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"] + "-" + current_parts["CurrentFunction"] + "-" + ( operations.length - 1 ).toString() );

			if ( button_to_remove ) {
				button_to_remove.parentElement.removeChild( button_to_remove );
			}

			operations.push( {
                        ["Operations" +current_parts["CurrentMarket"]+ "-" +current_parts["CurrentChannel"]+ "-" +current_parts["CurrentProcess"]+ "-" +current_parts["CurrentFunction"]+ "-" +( operations.length ).toString()]: [{
                        	"ID": "Operations" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"] + "-" + current_parts["CurrentFunction"] + "-" + ( operations.length ).toString(),
							"Name" : "",
                        	"Duration": "",
                        	"Effort": "",
                        	"Periodicity": ""
                        }]
			} );

			if ( document.getElementById( "add_operation" ).style.display = "block" )
				document.getElementById( "add_operation" ).style.display = "none";
			else {
				document.getElementById( "add_operation" ).style.display = "block";
			}

			table.appendChild( first_row );
			table.appendChild( second_row );
			table.appendChild( third_row );

			first_row.appendChild( first_cell_of_first_row );

			second_row.appendChild( first_cell_of_second_row );
			second_row.appendChild( second_cell_of_second_row );

			third_row.appendChild( first_cell_of_third_row );

			first_cell_of_first_row.appendChild( name );

			first_cell_of_second_row.appendChild( duration );
			second_cell_of_second_row.appendChild( effort );

			first_cell_of_third_row.appendChild( periodicity );
			first_cell_of_third_row.appendChild( add_button );

			container.appendChild( table );

			break;
	}

	///view model for debug

	//if (document.getElementsByTagName("pre")[0] != null) {
	//	document.body.removeChild(document.getElementsByTagName("pre")[0]);
	//}
	//document.body.appendChild(document.createElement('pre')).innerHTML = syntaxHighlight(model);
}

function TextChange( part, sender ) {
	let parent = sender.parentElement.parentElement.parentElement;
	let parent_number = parent.id.split( '-' );
	switch ( String( part ) ) {
		case "Market_name":
			markets[parent.id.replace( /[^-0-9]/gim, '' )][parent.id][0]["Name"] = sender.value;
			break;

		case "Market_amount":
			markets[parent.id.replace( /[^-0-9]/gim, '' )][parent.id][0]["Amount"] = sender.value;
			break;

		case "Market_loyalty":
			markets[parent.id.replace( /[^-0-9]/gim, '' )][parent.id][0]["Loyalty"] = sender.value;
			break;

		case "Channel_name":
			var channels = model["Organization"][0]
				["Markets"][current_parts["CurrentMarket"]]
				["Market" + current_parts["CurrentMarket"]][0]
				["Channels"];
			channels[parent_number[parent_number.length - 1]][parent.id][0]["Name"] = sender.value;

			break;

		case "Other":
			var channels = model["Organization"][0]
				["Markets"][current_parts["CurrentMarket"]]
				["Market" + current_parts["CurrentMarket"]][0]
				["Channels"];
			channels[parent_number[parent_number.length - 1]][parent.id][0]["Other"] = sender.value;

			break;

		case "Goods_name":
			var goods = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Goods"];

			goods[parent_number[parent_number.length - 1]][parent.id][0]["Name"] = sender.value;

			break;

		case "Goods_margin":
			var goods = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Goods"];
			goods[parent_number[parent_number.length - 1]][parent.id][0]["Margin"] = sender.value;

			break;

		case "Goods_freq_day":
			var goods = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Goods"];
			goods[parent_number[parent_number.length - 1]][parent.id][0]["Freq_day"] = sender.value;

			break;

		case "Goods_freq_week":
			var goods = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Goods"];
			goods[parent_number[parent_number.length - 1]][parent.id][0]["Freq_week"] = sender.value;

			break;

		case "Goods_freq_month":
			var goods = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Goods"];
			goods[parent_number[parent_number.length - 1]][parent.id][0]["Freq_month"] = sender.value;

			break;

		case "Goods_freq_year":
			var goods = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Goods"];
			goods[parent_number[parent_number.length - 1]][parent.id][0]["Freq_year"] = sender.value;

			break;

		case "Group":
			var goods = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Goods"];
			goods[parent_number[parent_number.length - 1]][parent.id][0]["Group"] = sender.value;

			break;

		case "Provider_name":
			var provider = model
                ["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Goods"][current_parts["CurrentGoods"]]
                ["Goods" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentGoods"]][0]["Providers"];
			provider[parent_number[parent_number.length - 1]][parent.id][0]["Name"] = sender.value;

			break;

		case "Provider_amount":
			var provider = model
                ["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Goods"][current_parts["CurrentGoods"]]
                ["Goods" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentGoods"]][0]["Providers"];
			provider[parent_number[parent_number.length - 1]][parent.id][0]["Amount"] = sender.value;

			break;

		case "Provider_price":
			var provider = model
                ["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Goods"][current_parts["CurrentGoods"]]
                ["Goods" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentGoods"]][0]["Providers"];
			provider[parent_number[parent_number.length - 1]][parent.id][0]["Price"] = sender.value;

			break;

		case "Res_cost":
			var res = model
                ["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Goods"][current_parts["CurrentGoods"]]
                ["Goods" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentGoods"]][0]["Resources"];
			res[parent_number[parent_number.length - 1]][parent.id][0]["Cost"] = sender.value;

			break;

		case "Art_name":
			var res = model
                ["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Goods"][current_parts["CurrentGoods"]]
                ["Goods" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentGoods"]][0]["Resources"];
			res[parent_number[parent_number.length - 1]][parent.id][0]["Expenses"] = sender.value;

			break;

		case "Contestor_name":
			var contestor = model
               ["Organization"][0]
               ["Markets"][current_parts["CurrentMarket"]]
               ["Market" + current_parts["CurrentMarket"]][0]
               ["Contestors"];
			contestor[parent_number[parent_number.length - 1]][parent.id][0]["Name"] = sender.value;

			break;

		case "Contestor_loyalty":
			var contestor = model
               ["Organization"][0]
               ["Markets"][current_parts["CurrentMarket"]]
               ["Market" + current_parts["CurrentMarket"]][0]
               ["Contestors"];
			contestor[parent_number[parent_number.length - 1]][parent.id][0]["Loyalty"] = sender.value;

			break;

		case "Contestor_good_name":
			var contestor_goods = model
               ["Organization"][0]
               ["Markets"][current_parts["CurrentMarket"]]
               ["Market" + current_parts["CurrentMarket"]][0]
               ["Contestors"][current_parts["CurrentContestor"]]
               ["Contestor" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentContestor"]][0]["Goods"];
			contestor_goods[parent_number[parent_number.length - 1]][parent.id][0]["Name"] = sender.value;

			break;

		case "Contestor_good_price":
			var contestor_goods = model
               ["Organization"][0]
               ["Markets"][current_parts["CurrentMarket"]]
               ["Market" + current_parts["CurrentMarket"]][0]
               ["Contestors"][current_parts["CurrentContestor"]]
               ["Contestor" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentContestor"]][0]["Goods"];
			contestor_goods[parent_number[parent_number.length - 1]][parent.id][0]["Price"] = sender.value;

			break;

		case "Rent_time":
			var rent = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Rent"];

			rent[parent_number[parent_number.length - 1]][parent.id][0]["Time"] = sender.value;

			break;
		case "Rent_amount":
			var rent = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Rent"];

			rent[parent_number[parent_number.length - 1]][parent.id][0]["Amount"] = sender.value;

			break;
		case "Rent_Price":
			var rent = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Rent"];

			rent[parent_number[parent_number.length - 1]][parent.id][0]["Price"] = sender.value;

			break;
		case "Rent_name":
			var rent = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Rent"];

			rent[parent_number[parent_number.length - 1]][parent.id][0]["Name"] = sender.value;

			break;
		case "Electricity_time":
			var Electricity = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Electricity"];

			Electricity[parent_number[parent_number.length - 1]][parent.id][0]["Time"] = sender.value;

			break;

		case "Electricity_name":
			var Electricity = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Electricity"];

			Electricity[parent_number[parent_number.length - 1]][parent.id][0]["Name"] = sender.value;

			break;
			
		case "Electricity_rate":
			var Electricity = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Electricity"];

			Electricity[parent_number[parent_number.length - 1]][parent.id][0]["Rate"] = sender.value;

			break;
		case "Power":
			var Electricity = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Electricity"];

			Electricity[parent_number[parent_number.length - 1]][parent.id][0]["Power"] = sender.value;

			break;
		case "Electricity_amount":
			var Electricity = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Electricity"];

			Electricity[parent_number[parent_number.length - 1]][parent.id][0]["Amount"] = sender.value;

			break;
		case "MBP_name":
			var mbp = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["MBP"];

			mbp[parent_number[parent_number.length - 1]][parent.id][0]["Name"] = sender.value;

			break;
		case "MBP_Price":
			var mbp = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["MBP"];

			mbp[parent_number[parent_number.length - 1]][parent.id][0]["Price"] = sender.value;

			break;
		case "MBP_amount":
			var mbp = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["MBP"];

			mbp[parent_number[parent_number.length - 1]][parent.id][0]["Amount"] = sender.value;

			break;
		case "Assets_name":
			var assets = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Assets"];

			assets[parent_number[parent_number.length - 1]][parent.id][0]["Name"] = sender.value;

			break;

		case "Assets_Price":
			var assets = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Assets"];

			assets[parent_number[parent_number.length - 1]][parent.id][0]["Price"] = sender.value;

			break;
		case "Useful_life":
			var assets = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Assets"];

			assets[parent_number[parent_number.length - 1]][parent.id][0]["Useful_life"] = sender.value;

			break;
		case "Position_name":
			var Position = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Positions"];

			Position[parent_number[parent_number.length - 1]][parent.id][0]["Name"] = sender.value;

			break;
		case "Position_rate":
			var Position = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Positions"];

			Position[parent_number[parent_number.length - 1]][parent.id][0]["Rate"] = sender.value;

			break;
		case "Position_salary":
			var Position = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Positions"];

			Position[parent_number[parent_number.length - 1]][parent.id][0]["Salary"] = sender.value;

			break;

		case "Position_add":
			var Position = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Positions"];

			Position[parent_number[parent_number.length - 1]][parent.id][0]["Add"] = sender.value;

			break;

		case "Process_name":
			var processes = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Processes"];

			processes[parent_number[parent_number.length - 1]][parent.id][0]["Name"] = sender.value;

			break;

		case "Process_duration":
			var processes = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Processes"];

			processes[parent_number[parent_number.length - 1]][parent.id][0]["Duration"] = sender.value;

			break;

		case "Process_periodicity":
			var processes = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Processes"];

			processes[parent_number[parent_number.length - 1]][parent.id][0]["Periodicity"] = sender.value;

			break;

		case "Process_effort":
			var processes = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Processes"];

			processes[parent_number[parent_number.length - 1]][parent.id][0]["Effort"] = sender.value;

			break;

		case "Functions_name":
			var functions = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Processes"][current_parts["CurrentProcess"]]
                ["Processes" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"]][0]
				["Functions"];

			functions[parent_number[parent_number.length - 1]][parent.id][0]["Name"] = sender.value;

			break;

		case "Function_duration":
			var functions = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Processes"][current_parts["CurrentProcess"]]
                ["Processes" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"]][0]
				["Functions"];

			functions[parent_number[parent_number.length - 1]][parent.id][0]["Duration"] = sender.value;

			break;

		case "Function_periodicity":
			var functions = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Processes"][current_parts["CurrentProcess"]]
                ["Processes" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"]][0]
				["Functions"];

			functions[parent_number[parent_number.length - 1]][parent.id][0]["Periodicity"] = sender.value;

			break;

		case "Function_effort":
			var functions = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Processes"][current_parts["CurrentProcess"]]
                ["Processes" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"]][0]
				["Functions"];

			functions[parent_number[parent_number.length - 1]][parent.id][0]["Effort"] = sender.value;

			break;

		case "Operations_name":
			var operations = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Processes"][current_parts["CurrentProcess"]]
                ["Processes" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"]][0]["Functions"][current_parts["CurrentFunction"]]
                ["Functions" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"] + "-" + current_parts["CurrentFunction"]][0]
				["Operations"];

			operations[parent_number[parent_number.length - 1]][parent.id][0]["Name"] = sender.value;

			break;

		case "Operation_duration":
			var operations = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Processes"][current_parts["CurrentProcess"]]
                ["Processes" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"]][0]["Functions"][current_parts["CurrentFunction"]]
                ["Functions" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"] + "-" + current_parts["CurrentFunction"]][0]
				["Operations"];

			operations[parent_number[parent_number.length - 1]][parent.id][0]["Duration"] = sender.value;

			break;

		case "Operation_periodicity":
			var operations = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Processes"][current_parts["CurrentProcess"]]
                ["Processes" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"]][0]["Functions"][current_parts["CurrentFunction"]]
                ["Functions" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"] + "-" + current_parts["CurrentFunction"]][0]
				["Operations"];

			operations[parent_number[parent_number.length - 1]][parent.id][0]["Periodicity"] = sender.value;

			break;

		case "Operation_effort":
			var operations = model["Organization"][0]
                ["Markets"][current_parts["CurrentMarket"]]
                ["Market" + current_parts["CurrentMarket"]][0]
                ["Channels"][current_parts["CurrentChannel"]]
                ["Channel" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"]][0]
                ["Processes"][current_parts["CurrentProcess"]]
                ["Processes" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"]][0]["Functions"][current_parts["CurrentFunction"]]
                ["Functions" + current_parts["CurrentMarket"] + "-" + current_parts["CurrentChannel"] + "-" + current_parts["CurrentProcess"] + "-" + current_parts["CurrentFunction"]][0]
				["Operations"];

			operations[parent_number[parent_number.length - 1]][parent.id][0]["Effort"] = sender.value;

			break;
	}
}

///debug

//function syntaxHighlight(json) {
//	if (typeof json != 'string') {
//		json = JSON.stringify(json, undefined, 2);
//	}
//	json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
//	return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
//		var cls = 'number';
//		if (/^"/.test(match)) {
//			if (/:$/.test(match)) {
//				cls = 'key';
//			} else {
//				cls = 'string';
//			}
//		} else if (/true|false/.test(match)) {
//			cls = 'boolean';
//		} else if (/null/.test(match)) {
//			cls = 'null';
//		}
//		return '<span class="' + cls + '">' + match + '</span>';
//	});
//}

function finish( switcher ) {
	switch ( switcher ) {
		case 1:
			var editor = document.getElementById( "editor" );
			var table = document.getElementById( "table" );
			var finish_button = document.getElementById( "finish" );
			table.style.display = "none";
			editor.style.display = "block";
			finish_button.innerText = "Готово";
			finish_button.onclick = function () {
				finish( 2 );
			};

			NextBlock(0, 'Markets');
			break;
		case 2:
			var editor = document.getElementById( "editor" );
			var table = document.getElementById( "table" );
			var finish_button = document.getElementById( "finish" );
			document.getElementById( "path" ).style.display = "block";
			table.style.display = "block";
			editor.style.display = "none";
			finish_button.innerText = "Изменить";
			finish_button.onclick = function () {
				finish( 1 );
			};
			document.getElementById( "path" ).style.display = "none";
			math();
			view_providers();
			view_contestors();
			view_goods();
			view_res();
			view_channels();
			view_markets();

			break;
	}
}
function view_providers() {
	var block_table;
	if ( document.getElementById( "providerBlock" ) == null ) {
		block_table = document.createElement( 'table' );
		block_table.id = "providerBlock";
	}
	else {
		block_table = ( document.getElementById( "providerBlock" ) );
		if ( block_table.childElementCount > 0 ) {
			while ( block_table.firstChild ) {
				block_table.removeChild( block_table.firstChild );
			}
		}
	}

	var provider_in_table = document.getElementById( "provider" );
	var headers = document.createElement( 'tr' );

	var th_name = document.createElement( 'th' );
	th_name.innerText = "Наименование";

	var th_amount = document.createElement( 'th' );
	th_amount.innerText = "Объем поставок";

	var th_price = document.createElement( 'th' );
	th_price.innerText = "Цена";

	headers.appendChild( th_name );
	headers.appendChild( th_price );
	headers.appendChild( th_amount );
	block_table.appendChild( headers );


	markets.forEach( function ( market, q, markets ) {
		let channels = market["Market" + q][0]["Channels"];

		channels.forEach( function ( channel_item, i, channels ) {
			let goods = channel_item["Channel" + q + "-" + i][0]["Goods"];

			goods.forEach( function ( good_item, j, goods ) {
				let providers = good_item["Goods" + q + "-" + i + "-" + j][0]["Providers"];

				providers.forEach( function ( provider_item, x, providers ) {
					var block_table_row = document.createElement( 'tr' );

					var name = document.createElement( "td" );
					var amount = document.createElement( "td" );
					var price = document.createElement( "td" );

					name.className = "table_cells";
					amount.className = "table_cells";
					price.className = "table_cells";

					name.innerText = provider_item["Provider" + q + "-" + i + "-" + j + "-" + x][0]["Name"];
					amount.innerText = provider_item["Provider" + q + "-" + i + "-" + j + "-" + x][0]["Amount"];
					price.innerText = provider_item["Provider" + q + "-" + i + "-" + j + "-" + x][0]["Price"];

					block_table_row.appendChild( name );
					block_table_row.appendChild( price );
					block_table_row.appendChild( amount );
					block_table.appendChild( block_table_row );
				} );
			} );
		} );
	} );

	provider_in_table.appendChild( block_table );
}

function view_contestors() {
	var block_table;
	if ( document.getElementById( "contestorsBlock" ) == null ) {
		block_table = document.createElement( 'table' );
		block_table.id = "contestorsBlock";
	}
	else {
		block_table = ( document.getElementById( "contestorsBlock" ) );
		if ( block_table.childElementCount > 0 ) {
			while ( block_table.firstChild ) {
				block_table.removeChild( block_table.firstChild );
			}
		}
	}

	var contestor_in_table = document.getElementById( "contestors" );
	var headers = document.createElement( 'tr' );

	var th_name = document.createElement( 'th' );
	th_name.innerText = "Наименование";

	headers.appendChild( th_name );
	block_table.appendChild( headers );

	markets.forEach( function ( market, q, markets ) {
		let contestors = market["Market" + q][0]["Contestors"];

		contestors.forEach( function ( contestor, i, contestors ) {
			var block_table_row = document.createElement( 'tr' );
			var name = document.createElement( "td" );

			name.className = "table_cells";

			name.innerText = contestor["Contestor" + q + "-" + i][0]["Name"];

			block_table_row.appendChild( name );
			block_table.appendChild( block_table_row );
		} );
	} );

	contestor_in_table.appendChild( block_table );
}

function view_goods() {
	var block_table;
	if ( document.getElementById( "goodsBlock" ) == null ) {
		block_table = document.createElement( 'table' );
		block_table.id = "goodsBlock";
	}
	else {
		block_table = ( document.getElementById( "goodsBlock" ) );
		if ( block_table.childElementCount > 0 ) {
			while ( block_table.firstChild ) {
				block_table.removeChild( block_table.firstChild );
			}
		}
	}

	var goods_in_table = document.getElementById( "good" );

	var headers = document.createElement( 'tr' );

	var th_name = document.createElement( 'th' );
	th_name.innerText = "Наименование";

	var th_margin = document.createElement( 'th' );
	th_margin.innerText = "Наценка";

	var th_price = document.createElement( 'th' );
	th_price.innerText = "Цена";

	var th_freq = document.createElement( 'th' );
	th_freq.innerText = "Частота";

	headers.appendChild( th_name );
	headers.appendChild( th_price );
	headers.appendChild( th_margin );
	headers.appendChild( th_freq );
	block_table.appendChild( headers );

	markets.forEach( function ( market, q, markets ) {
		let channels = market["Market" + q][0]["Channels"];

		channels.forEach( function ( channel_item, i, channels ) {
			let goods = channel_item["Channel" + q + "-" + i][0]["Goods"];

			goods.forEach( function ( good_item, j, goods ) {
				var block_table_row = document.createElement( 'tr' );
				var name = document.createElement( "td" );
				var margin = document.createElement( "td" );
				var price = document.createElement( "td" );
				var freq = document.createElement( "td" );

				name.className = "table_cells";
				margin.className = "table_cells";
				price.className = "table_cells";
				freq.className = "table_cells";

				name.innerText = good_item["Goods" + q + "-" + i + "-" + j][0]["Name"];
				margin.innerText = good_item["Goods" + q + "-" + i + "-" + j][0]["Margin"];
				price.innerText = good_item["Goods" + q + "-" + i + "-" + j][0]["Final_price"];
				freq.innerText = good_item["Goods" + q + "-" + i + "-" + j][0]["Freq_year"];

				block_table_row.appendChild( name );
				block_table_row.appendChild( price );
				block_table_row.appendChild( margin );
				block_table_row.appendChild( freq );
				block_table.appendChild( block_table_row );
			} );
		} );
	} );

	goods_in_table.appendChild( block_table );
}

function view_res() {
	var block_table;
	var goods_in_table = document.getElementById( "resources" );

	if ( document.getElementById( "resBlock" ) == null ) {
		block_table = document.createElement( 'table' );
		block_table.id = "resBlock";
		goods_in_table.appendChild( block_table )
	}
	else {
		block_table = ( document.getElementById( "resBlock" ) );
		if ( block_table.childElementCount > 0 ) {
			while ( block_table.firstChild ) {
				block_table.removeChild( block_table.firstChild );
			}
		}
	}

	
	let a_sum = 0, m_sum = 0, p_sum = 0, e_sum = 0, r_sum = 0, o_sum = 0;

	markets.forEach( function ( market, q, markets ) {
		let channels = market["Market" + q][0]["Channels"];

		channels.forEach( function ( channel_item, i, channels ) {
			let assets = channel_item["Channel" + q + "-" + i][0]["Assets"];
			let mbp = channel_item["Channel" + q + "-" + i][0]["MBP"];
			let positions = channel_item["Channel" + q + "-" + i][0]["Positions"];
			let other = channel_item["Channel" + q + "-" + i][0]["Other"];
			let elect = channel_item["Channel" + q + "-" + i][0]["Electricity"];
			let rent = channel_item["Channel" + q + "-" + i][0]["Rent"];

			assets.forEach( function ( asset, a, assets ) {
				a_sum += asset["Assets" + q + "-" + i + "-" + a][0]["Price"];
			} );
			
			mbp.forEach( function ( mb, m, mbp ) {
				m_sum += mb["MBP" + q + "-" + i + "-" + m][0]["Price"] * mb["MBP" + q + "-" + i + "-" + m][0]["Amount"];
			} );
			
			positions.forEach( function ( position, p, positions ) {
				p_sum += position["Positions" + q + "-" + i + "-" + p][0]["Final_salary"] * position["Positions" + q + "-" + i + "-" + p][0]["Rate"];
			} );

			elect.forEach( function ( el, e, elect ) {
				e_sum += el["Electricity" + q + "-" + i + "-" + e][0]["Amount"] * el["Electricity" + q + "-" + i + "-" + e][0]["Rate"] * el["Electricity" + q + "-" + i + "-" + e][0]["Power"] * el["Electricity" + q + "-" + i + "-" + e][0]["Time"];
			} );

			rent.forEach( function ( ren, r, rent ) {
				r_sum += ren["Rent" + q + "-" + i + "-" + r][0]["Price"] * ren["Rent" + q + "-" + i + "-" + r][0]["Amount"] * ren["Rent" + q + "-" + i + "-" + r][0]["Time"];
			} );
			
			o_sum += channel_item["Channel" + q + "-" + i][0]["Other"];
			
		} );
	} );
	var a_block_table_row = document.createElement( 'tr' );
	var a_item_name = document.createElement( "td" );
	a_item_name.className = "table_cells";
	a_item_name.innerText = "Основные средства";
	a_block_table_row.appendChild( a_item_name );
	var a_item = document.createElement( "td" );
	a_item.className = "table_cells";
	a_item.innerText = a_sum;
	a_block_table_row.appendChild( a_item );

	var m_block_table_row = document.createElement( 'tr' );
	var m_item_name = document.createElement( "td" );
	m_item_name.className = "table_cells";
	m_item_name.innerText = "МБП";
	m_block_table_row.appendChild( m_item_name );
	var m_item = document.createElement( "td" );
	m_item.className = "table_cells";
	m_item.innerText = m_sum;
	m_block_table_row.appendChild( m_item );

	var p_block_table_row = document.createElement( 'tr' );
	var p_item_name = document.createElement( "td" );
	p_item_name.className = "table_cells";
	p_item_name.innerText = "Должности";
	p_block_table_row.appendChild( p_item_name );
	var p_item = document.createElement( "td" );
	p_item.className = "table_cells";
	p_item.innerText = p_sum;
	p_block_table_row.appendChild( p_item );

	var e_block_table_row = document.createElement( 'tr' );
	var e_item_name = document.createElement( "td" );
	e_item_name.className = "table_cells";
	e_item_name.innerText = "Эл. оборудование";
	e_block_table_row.appendChild( e_item_name );
	var e_item = document.createElement( "td" );
	e_item.className = "table_cells";
	e_item.innerText = e_sum;
	e_block_table_row.appendChild( e_item );

	var r_block_table_row = document.createElement( 'tr' );
	var r_item_name = document.createElement( "td" );
	r_item_name.className = "table_cells";
	r_item_name.innerText = "Аренда";
	r_block_table_row.appendChild( r_item_name );
	var r_item = document.createElement( "td" );
	r_item.className = "table_cells";
	r_item.innerText = r_sum;
	r_block_table_row.appendChild( r_item );

	var o_block_table_row = document.createElement( 'tr' );
	var o_item_name = document.createElement( "td" );
	o_item_name.className = "table_cells";
	o_item_name.innerText = "Прочие";
	o_block_table_row.appendChild( o_item_name );
	var o_item = document.createElement( "td" );
	o_item.className = "table_cells";
	o_item.innerText = o_sum;
	o_block_table_row.appendChild( o_item );

	block_table.appendChild( a_block_table_row );
	block_table.appendChild( m_block_table_row );
	block_table.appendChild( p_block_table_row );
	block_table.appendChild( e_block_table_row );
	block_table.appendChild( r_block_table_row );
	block_table.appendChild( o_block_table_row );
}

function view_channels() {
	var channels_json = model["Organization"][0]
		["Markets"][current_parts["CurrentMarket"]]
		["Market" + current_parts["CurrentMarket"]][0]
		["Channels"];

	var block_table;
	if ( document.getElementById( "chBlock" ) == null ) {
		block_table = document.createElement( 'table' );
		block_table.id = "chBlock";
	}
	else {
		block_table = ( document.getElementById( "chBlock" ) );
		if ( block_table.childElementCount > 0 ) {
			while ( block_table.firstChild ) {
				block_table.removeChild( block_table.firstChild );
			}
		}
	}

	var res_in_table = document.getElementById( "routes" );
	var headers = document.createElement( 'tr' );

	var th_name = document.createElement( 'th' );
	th_name.innerText = "Наименование";

	headers.appendChild( th_name );
	block_table.appendChild( headers );

	channels_json.forEach( function ( r, i, channels_json ) {
		var block_table_row = document.createElement( 'tr' );
		var name = document.createElement( "td" );

		name.className = "table_cells";

		name.innerText = r["Channel" + current_parts["CurrentMarket"] + "-" + i][0]["Name"];

		block_table_row.appendChild( name );
		block_table.appendChild( block_table_row );
	} );

	res_in_table.appendChild( block_table );
}

function view_markets() {
	var block_table;
	if ( document.getElementById( "marketsBlock" ) == null ) {
		block_table = document.createElement( 'table' );
		block_table.id = "marketsBlock";
	}
	else {
		block_table = ( document.getElementById( "marketsBlock" ) );
		if ( block_table.childElementCount > 0 ) {
			while ( block_table.firstChild ) {
				block_table.removeChild( block_table.firstChild );
			}
		}
	}

	var markets_in_table = document.getElementById( "market" );
	var headers = document.createElement( 'tr' );

	var th_name = document.createElement( 'th' );
	th_name.innerText = "Наименование";

	var th_amount = document.createElement( 'th' );
	th_amount.innerText = "Объем";

	var th_loyalty = document.createElement( 'th' );
	th_loyalty.innerText = "Количество лояльных клиентов";

	headers.appendChild( th_name );
	headers.appendChild( th_amount );
	headers.appendChild( th_loyalty );
	block_table.appendChild( headers );

	markets.forEach( function ( m, i, markets ) {
		var block_table_row = document.createElement( 'tr' );
		var name = document.createElement( "td" );
		var amount = document.createElement( "td" );
		var loyalty = document.createElement( "td" );

		name.className = "table_cells";
		amount.className = "table_cells";
		loyalty.className = "table_cells";

		name.innerText = m["Market" + i][0]["Name"];
		amount.innerText = m["Market" + i][0]["Amount"];
		loyalty.innerText = typeof m["Market" + i][0]["Loyalty"] !== 'undefined' ? m["Market" + i][0]["Loyalty"] : 0;

		block_table_row.appendChild( name );
		block_table_row.appendChild( amount );
		block_table_row.appendChild( loyalty );

		block_table.appendChild( block_table_row );
	} );

	markets_in_table.appendChild( block_table );
}


function math() {
	let prices;
	let min_price = 0;

	//---------<Объединение товаров в товарные группы>----------

	markets.forEach( function ( market, q, markets ) {
		let channels = market["Market" + q][0]["Channels"];

		channels.forEach( function ( channel_item, i, channels ) {
			let goods = channel_item["Channel" + q + "-" + i][0]["Goods"];

			group_storage = {};

			goods.forEach( function ( good_item, j, goods ) {
				let group = good_item["Goods" + q + "-" + i + "-" + j][0]["Group"];

				if ( !( group in group_storage ) ) {
					if ( typeof group_storage[group] == 'array' ) {
						group_storage[group].push( good_item );
					}
					else {
						group_storage[group] = [];
						group_storage[group].push( good_item );
					}
				}
				else {
					group_storage[group].push( good_item );
				}

				//-----------<Вычисление конечной стоимости>------------

				let providers = good_item["Goods" + q + "-" + i + "-" + j][0]["Providers"];
				prices = [];

				providers.forEach( function ( provider, c, providers ) {
					let price = provider["Provider" + q + "-" + i + "-" + j + "-" + c][0]["Price"];
					min_price = price;
					prices[c] = price;
					for ( let p = 0; p < prices.length; p++ ) {
						if ( prices[c] < prices[p] ) {
							min_price = prices[c];
						}
					}
				} );

				let margin = good_item["Goods" + q + "-" + i + "-" + j][0]["Margin"];
				good_item["Goods" + q + "-" + i + "-" + j][0]["Final_price"] = parseFloat( min_price ) + parseFloat( min_price ) * parseFloat( margin ) / 100;
				good_item["Goods" + q + "-" + i + "-" + j][0]["Purchase_price"] = min_price;

				//-----------</Вычисление конечной стоимости>------------

			} );

			//--------<Вычисление глубины ассортимента>---------

			for ( let gr in group_storage ) {
				let len = 0;

				if ( "assortment_depth" in group_storage[gr] )
					len = group_storage[gr].length - 1;
				else len = group_storage[gr].length;

				group_storage[gr]["assortment_depth"] = 1 - 1 / len;
			}

			//--------</Вычисление глубины ассортимента>---------

			channel_item["Channel" + q + "-" + i][0]["Goods_groups"] = group_storage;
		} );
	} );

	//----------------</Объединение товаров в товарные группы>-------------------

	//--------------<Вычисление конкурентоспособности цены>--------------

	let coef = 0, group_len = 0, diff = 0, all_val = 0;
	markets.forEach( function ( market, i, markets ) {
		let contestors = market["Market" + i][0]["Contestors"];
		let channels = market["Market" + i][0]["Channels"];

		channels.forEach( function ( channel, q, channels ) {
			let goods_groups = channel["Channel" + i + "-" + q][0]["Goods_groups"];
			let all_goods = channel["Channel" + i + "-" + q][0]["Goods"];

			for ( good_group_container in goods_groups ) {
				let group = goods_groups[good_group_container];

				group.forEach( function ( good_in_group, g_g, goods_groups ) {
					let clear_good = typeof good_in_group["Goods" + i + "-" + q + "-" + g_g] != 'undefined' ?
											good_in_group["Goods" + i + "-" + q + "-" + g_g][0] : 0;

					if ( clear_good != 0 ) {
						group_len++;
						contestors.forEach( function ( contestor, j, contestors ) {
							let cont_goods = contestor["Contestor" + i + "-" + j][0]["Goods"];

							cont_goods.forEach( function ( cgood, c, cont_goods ) {
								let clear_cgood = typeof cgood["Goods" + i + "-" + j + "-" + c] != 'undefined' ?
														cgood["Goods" + i + "-" + j + "-" + c][0] : 0;
								if ( clear_good["Name"] == clear_cgood["Name"] ) {

									diff += parseFloat( clear_good["Final_price"] ) - parseFloat( clear_cgood["Price"] );
									console.log( parseFloat( clear_good["Final_price"] ) - parseFloat( clear_cgood["Price"] ) );
									console.log( diff );
								}
							} );
						} );

					}

				} );

				coef = diff / group_len;
				group["Coeff"] = coef;
				channel["Channel" + i + "-" + q][0]["Valuation"] = parseFloat( group["Coeff"] ) + parseFloat( group["assortment_depth"] ) + 1.0;
				all_val += parseFloat( group["Coeff"] ) + parseFloat( group["assortment_depth"] ) + 1.0;
				console.log( all_val );
			}
			channel["Channel" + i + "-" + q][0]["Loyals"] = ( parseFloat( market["Market" + i][0]["Amount"] ) * all_val ) / ( parseInt( market["Market" + i][0]["Amount"] ) + all_val );
		} );
	} );

	//--------------</Вычисление конкурентоспособности цены>--------------
	let income_day = 0, income_week = 0, income_month = 0, income_year = 0,
		assets_day = 0, assets_week = 0, assets_month = 0, assets_year = 0,
		gain = 0;

	markets.forEach( function ( market, a, markets ) {
		let channels = market["Market" + a][0]["Channels"];

		channels.forEach( function ( channel, b, channels ) {
			let goods = channel["Channel" + a + "-" + b][0]["Goods"];

			goods.forEach( function ( good, c, goods ) {
				income_day += parseFloat( good["Goods" + a + "-" + b + "-" + c][0]["Final_price"] ) * parseFloat( good["Goods" + a + "-" + b + "-" + c][0]["Freq_day"] ) * parseInt( channel["Channel" + a + "-" + b][0]["Loyals"] );
				income_week += parseFloat( good["Goods" + a + "-" + b + "-" + c][0]["Final_price"] ) * parseFloat( good["Goods" + a + "-" + b + "-" + c][0]["Freq_week"] ) * parseInt( channel["Channel" + a + "-" + b][0]["Loyals"] );
				income_month += parseFloat( good["Goods" + a + "-" + b + "-" + c][0]["Final_price"] ) * parseFloat( good["Goods" + a + "-" + b + "-" + c][0]["Freq_month"] ) * parseInt( channel["Channel" + a + "-" + b][0]["Loyals"] );
				income_year += parseFloat( good["Goods" + a + "-" + b + "-" + c][0]["Final_price"] ) * parseFloat( good["Goods" + a + "-" + b + "-" + c][0]["Freq_year"] ) * parseInt( channel["Channel" + a + "-" + b][0]["Loyals"] );

				assets_day += parseFloat( good["Goods" + a + "-" + b + "-" + c][0]["Purchase_price"] ) * parseFloat( good["Goods" + a + "-" + b + "-" + c][0]["Freq_day"] );
				assets_week += parseFloat( good["Goods" + a + "-" + b + "-" + c][0]["Purchase_price"] ) * parseFloat( good["Goods" + a + "-" + b + "-" + c][0]["Freq_week"] );
				assets_month += parseFloat( good["Goods" + a + "-" + b + "-" + c][0]["Purchase_price"] ) * parseFloat( good["Goods" + a + "-" + b + "-" + c][0]["Freq_month"] );
				assets_year += parseFloat( good["Goods" + a + "-" + b + "-" + c][0]["Purchase_price"] ) * parseFloat( good["Goods" + a + "-" + b + "-" + c][0]["Freq_year"] );

				gain += parseFloat( good["Goods" + a + "-" + b + "-" + c][0]["Final_price"] );

			} );

			channel["Channel" + a + "-" + b][0]["Income_day"] = income_day;
			channel["Channel" + a + "-" + b][0]["Income_week"] = income_week;
			channel["Channel" + a + "-" + b][0]["Income_month"] = income_month;
			channel["Channel" + a + "-" + b][0]["Income_year"] = income_year;

			channel["Channel" + a + "-" + b][0]["Assets_day"] = assets_day;
			channel["Channel" + a + "-" + b][0]["Assets_week"] = assets_week;
			channel["Channel" + a + "-" + b][0]["Assets_month"] = assets_month;
			channel["Channel" + a + "-" + b][0]["Assets_year"] = assets_year;

			channel["Channel" + a + "-" + b][0]["Profit_day"] = income_day - assets_day;
			channel["Channel" + a + "-" + b][0]["Profit_week"] = income_week - assets_week;
			channel["Channel" + a + "-" + b][0]["Profit_month"] = income_month - assets_month;
			channel["Channel" + a + "-" + b][0]["Profit_year"] = income_year - assets_year;

			channel["Channel" + a + "-" + b][0]["Profitability"] = ( income_year - assets_year ) * 100 / assets_year;

			channel["Channel" + a + "-" + b][0]["Gain"] = gain;

			let assets = channel["Channel" + a + "-" + b][0]["Assets"];
			assets.forEach( function ( asset, d, assets ) {
				let useful_life = parseFloat( asset["Assets" + a + "-" + b + "-" + d][0]["Useful_life"] );
				asset["Assets" + a + "-" + b + "-" + d][0]["Depreciation_year"] = 1 / useful_life;
				asset["Assets" + a + "-" + b + "-" + d][0]["Depreciation_month"] = 1 / ( useful_life * 12 );
			} );

			let positions = channel["Channel" + a + "-" + b][0]["Positions"];
			positions.forEach( function ( position, e, positions ) {
				let salary = parseFloat( position["Positions" + a + "-" + b + "-" + e][0]["Salary"] );
				let addition = parseFloat( position["Positions" + a + "-" + b + "-" + e][0]["Add"] );
				let final_salary = ( salary + addition ) * 12;
				position["Positions" + a + "-" + b + "-" + e][0]["Final_salary"] = final_salary;
				position["Positions" + a + "-" + b + "-" + e][0]["Insurance"] = final_salary * 0.32;
			} );
		} );
	} );

	markets.forEach( function ( market, x, markets ) {
		let channels = market["Market" + x][0]["Channels"];

		channels.forEach( function ( channel, y, channels ) {
			let goods = channel["Channel" + x + "-" + y][0]["Goods"];
			let grow_share = 0;
			let goods_array = [];

			goods.forEach( function ( good, q, goods ) {
				good["Goods" + x + "-" + y + "-" + q][0]["Gain_share"] = parseFloat( good["Goods" + x + "-" + y + "-" + q][0]["Final_price"] ) / gain;
				grow_share += parseFloat( good["Goods" + x + "-" + y + "-" + q][0]["Final_price"] ) / gain;
				good["Goods" + x + "-" + y + "-" + q][0]["Growing_share"] = grow_share;

				goods_array.push( good["Goods" + x + "-" + y + "-" + q][0] );
			} );

			goods_array.sort( function ( xx, yy ) {
				return yy.Final_price - xx.Final_price;
			} );

			goods_array.forEach( function ( good, q, goods_array ) {
				grow_share += parseFloat( good["Final_price"] ) / gain;
				good["Growing_share"] = grow_share;

				if ( grow_share < 0.8 ) {
					good["ABC"] = "A";
				}
				else if ( grow_share < 0.95 && grow_share > 0.8 ) {
					good["ABC"] = "B";
				}
				else if ( grow_share < 1 && grow_share > 0.95 ) {
					good["ABC"] = "C";
				}

			} );

			channel["Channel" + x + "-" + y][0]["ABC"] = goods_array;
		} );
	} );
}