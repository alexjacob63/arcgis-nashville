const base_url = "http://127.0.0.1:8000/api/";
require(["esri/config",
    "esri/Map",
    "esri/layers/FeatureLayer",
    "esri/views/MapView"],
    function (esriConfig, Map, FeatureLayer, MapView) {
        esriConfig.apiKey = "AAPK964fe1049f294fe1bb2a8197e3ce0c75WMGk1_fHdJ7xKa2asdMQIaTXNJELgJh7PzfkPlvdnWPCvDyRhtfIv4a_-V1dEIOS";

        const popupTrailheads = {
            "title": "Parcel Details: {ParID}",
            actions: [
                {
                    id: "view-details",
                    title: "View Parcel Details"
                }
            ],
            "content": "<b>Parcel ID:</b> {ParID}<br><b>Owner:</b> {OWNER}<br><b>Address:</b> {OwnAddr1}<br>{OwnAddr2}<br>{OwnAddr3}<br>"
            // <a class='action' id='statsLink' href='#'>View Parcel Details</a>
        }

        const parcelsLayer = new FeatureLayer({
            url: "https://maps.nashville.gov/arcgis/rest/services/Cadastral/Parcels/MapServer",
            // outFields: ["ParID", "OWNER", "OwnAddr1", "OwnAddr2", "OwnAddr3"],
            outFields: ['*'],
            popupTemplate: popupTrailheads,
            opacity: 0.75
        });

        const map = new Map({
            basemap: "arcgis-topographic", // Basemap layer service
            layers: [parcelsLayer]
        });

        const view = new MapView({
            map: map,
            center: [-86.8220, 36.1343], // Longitude, latitude
            zoom: 12, // Zoom level
            container: "viewDiv" // Div element
        });

        const popup = view.popup;
        popup.viewModel.on("trigger-action", (event) => {
            if (event.action.id === "view-details") {
                const attributes = popup.viewModel.selectedFeature.attributes;

                $.ajax({
                    url: base_url + 'general-info/?pin=' + attributes.ParID,
                    success: function (result) {
                        let table = `
                        <tr><td><b>Parcel ID:</b></td><td>${result.APN}</td></tr>
                        <tr><td><b>Parcel Address:</b></td><td>${result.Address}</td></tr>
                        <tr><td><b>Owner:	</b></td><td>${result.OwnerName}</td></tr>
                        <tr><td><b>Acquired Date:	</b></td><td>${result.OwnerDate}</td></tr>
                        <tr><td><b>Sale Price:	</b></td><td>${result.SaleAmount}</td></tr>
                        <tr><td><b>Sale Instrument:	</b></td><td><a href="${result.OwnerDocumentHref}">${result.OwnerDocument}</a></td></tr>
                        <tr><td><b>Mailing Address:	</b></td><td>${result.OwnerAddress}</td></tr>
                        <tr><td><b>Acreage:	</b></td><td>${result.Acreage}</td></tr>
                        <tr><td><b>Frontage Dimension:	</b></td><td>${result.Frontage}</td></tr>
                        <tr><td><b>Side Dimension:	</b></td><td>${result.Side}</td></tr>
                        <tr><td><b>Parcel Instrument:	</b></td><td><a href="${result.PropertyDocumentHref}">${result.PropertyDocument}</a></td></tr>
                        <tr><td><b>Parcel Instrument Date:	</b></td><td>${result.PropertyDate}</td></tr>
                        <tr><td><b>Census Tract:	</b></td><td>${result.Tract}</td></tr>
                        <tr><td><b>Tax District:	</b></td><td>${result.TaxDist}</td></tr>
                        <tr><td><b>Council District:	</b></td><td>${result.Council}</td></tr>
                        <tr><td><b>Land Use Description:	</b></td><td>${result.Description}</td></tr>
                        <tr><td><b>Assessment Date:	</b></td><td>${result.DateAssessed}</td></tr>
                        <tr><td><b>Total Appraised Value:	</b></td><td>${result.TotalApprValue}</td></tr>
                        <tr><td><b>Improved Appraised Value:	</b></td><td>${result.ImprApprValue}</td></tr>
                        <tr><td><b>Land Appraised Value:	</b></td><td>${result.LandApprValue}</td></tr>
                        <tr><td><b>Square Footage:	</b></td><td>${result.OwnerDate}</td></tr>`;

                        $('#data-table-gen-info').empty();
                        $('#data-table-gen-info').append(table);

                    },
                    error:function(){

                    }
                });

                $.ajax({
                    url: base_url + 'ownership-history/?pin=' + attributes.ParID,
                    success: function (results) {
                        let ownerTable = '';
                        results.forEach(function(result){
                            ownerTable += `
                            <tbody>
                            <tr>
                                <td style="font-weight: bold;">Owner Name</td>
                                <td>${result.OwnerName}</td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold;">Acquired Date</td>
                                <td>${result.OwnerDate}</td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold;">Sale Instrument</td>
                                <td><a href="${result.OwnerDocumentHref}" target="foo">${result.OwnerDocument}</a></td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold;">Mailing Address</td>
                                <td>${result.OwnerAddress}</td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold;">Mailing Country</td>
                                <td>${result.OwnerCountry}</td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold;">Sale Amount</td>
                                <td>${result.SaleAmount}</td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold;">Status</td>
                                <td>${result.Status}</td>
                            </tr></tbody>`;
                        });
                        $('#data-table-owner-history').empty();
                        $('#data-table-owner-history').append(ownerTable);
                    }
                });

                $.ajax({
                    url: base_url + 'property-history/?pin=' + attributes.ParID,
                    success: function (results) {
                        let propertyTable = '';
                        results.forEach(function(result){
                            propertyTable += `
                            <tbody>
                            <tr>
                            <td style="font-weight: bold;">Date Established</td>
                            <td>${result.PropertyDate}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;">Date Inactive</td>
                            <td>${result.PropertyDateInactive}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;">Instrument:</td>
                            <td><a href="${result.PropertyDocumentHref}" target="foo">
                            ${result.PropertyDocument}
                            </a></td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;">Acreage</td>
                            <td> ${result.Acreage}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;">Description</td>
                            <td>${result.Description}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;">Frontage Dimension</td>
                            <td>${result.Frontage}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;">Side Dimension</td>
                            <td>${result.Side}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;">Status</td>
                            <td>${result.Status}</td>
                        </tr></tbody>`;
                        });

                        $('#data-table-property-history').empty();
                        $('#data-table-property-history').append(propertyTable);
                    }
                });

                $.ajax({
                    url: base_url + 'zoning-history/?pin=' + attributes.ParID,
                    success: function (results) {
                        let zoningTable = '';
                        results.forEach(function(result){
                
                            zoningTable += `
                            <tbody>
                            <tr>
                            <td style="font-weight: bold;">Zone Code:</td>
                            <td>${result.Zoning}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;">Zone Description:</td>
                            <td>${result.Description}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;">Effective Date:</td>
                            <td>${result.EffectiveDate}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;">Ordinance:</td>
                            <td><a href="${result.OrdinanceHref}" target="foo">
                            ${result.Ordinance}
                            </a></td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;">Case Number:</td>
                            <td> ${result.CaseNumber}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;">Status</td>
                            <td>${result.Status}</td>
                        </tr></tbody>`;
                        });

                        $('#data-table-zoning-history').empty();
                        $('#data-table-zoning-history').append(zoningTable);
                    }
                });


                $.ajax({
                    url: base_url + 'assessment-history/?pin=' + attributes.ParID,
                    success: function (results) {
                        let assessmentTable = '';
                        results.forEach(function(result){
                
                            assessmentTable += `
                            <tbody>
                            <tr>
                            <td style="font-weight: bold;">Class:</td>
                            <td>${result.ClassDesc}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;">Effective Date:</td>
                            <td>${result.EffectiveDate}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;">Land Appraised Value:</td>
                            <td>${result.LandApprValue}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;">Improvement Appraised Value:</td>
                            <td> ${result.ImproveApprValue}</td>
                        </tr>
                        <tr>
                        <td style="font-weight: bold;">Total Appraised Value</td>
                        <td>${result.TotalApprValue}</td>
                    </tr>
                        <tr>
                            <td style="font-weight: bold;">Status</td>
                            <td>${result.Status}</td>
                        </tr></tbody>`;
                        });
                        $('#data-table-assessment-history').empty();
                        $('#data-table-assessment-history').append(assessmentTable);
                    }
                });
                $.ajax({
                    url: base_url + 'permit-history?apn=' + attributes.APN,
                    success: function (results) {
                        let permitTable = '';
                        results.forEach(function(result){
                
                            permitTable += `
                            <tbody>
                            <tr>
                            <td style="font-weight: bold;">Permit Number:</td>
                            <td>${result.PermitNumber}</td>
                        </tr>
                        <tr>
                        <td style="font-weight: bold;">Permit Type:</td>
                        <td>${result.PermitType}</td>
                    </tr>
                    <tr>
                    <td style="font-weight: bold;">Permit Number:</td>
                    <td>${result.PermitNumber}</td>
                </tr>
                        <tr>
                            <td style="font-weight: bold;">Permit SubType:</td>
                            <td>${result.PermitSubType}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;">Date Issued:</td>
                            <td>${result.DateIssued}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;">Purpose:</td>
                            <td> ${result.Purpose}</td>
                        </tr>
                        <tr>
                        <td style="font-weight: bold;">Contractor</td>
                        <td>${result.Contractor}</td>
                    </tr>
                        <tr>
                            <td style="font-weight: bold;">Value</td>
                            <td>${result.Value}</td>
                        </tr>
                        <tr>
                        <td style="font-weight: bold;">Status</td>
                        <td>${result.Status}</td>
                    </tr>
                        </tbody>`;
                        });
                        $('#data-table-permit-history').empty();
                        $('#data-table-permit-history').append(permitTable);
                    }
                });
  
            }
        });
    }
);