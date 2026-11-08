class DataRow {
    constructor(entity, strict, raw_data=null) {
        this.entity = entity;
        this.hidden = false;
        this.strict = strict;
        this.raw_data = raw_data;
        this.data = null;
        this.has_multiple = false;
        //this.colspan = null;
    }


    get_raw_data(col_cfgs, config, hass) {
        this.raw_data = col_cfgs.map((col) => {

            /* collect pairs of 'column_type' and 'column_key' */
            let col_getter = new Array();

            // newest and soon to be the only way to reference data sources!
            // effectively a merge of all the 'classic' selectors, including 'multi'
            // -> 'prop' will be used, if one of 'name', 'object_id' or 'key in this.entity'
            // -> otherwise 'attr' will be assumed
            // -> expansion from a list (as 'attr_as_list') will be automatically applied
            //    (by testing for Array.isArray(this.entity.attributes[col.data]))
            // -> 'multi' can be done by simply separating each data-src with ","
            // THIS WILL BE BREAKING OLD STUFF, INTRODUCE DEPRECATION WARNINGS!!!!!
            if ("data" in col) {
                for (let tok of col.data.split(","))
                    col_getter.push(["auto", tok.trim()]);

            // OLD data source selection: CALL DEPRECATION WARNING HERE!!!
            // start with console.log(), continue with console.warn(), console.error()
            //            and final phase: alert()
            } else if ("multi" in col) {
                show_deprecation_message();

                for(let item of col.multi)
                    col_getter.push([item[0], item[1]]);

            } else if ("attr" in col || "prop" in col || "attr_as_list" in col ) {
                show_deprecation_message();

                if ("attr" in col)
                    col_getter.push(["attr", col.attr]);
                else if ("prop" in col)
                    col_getter.push(["prop", col.prop]);
                else if ("attr_as_list" in col)
                    col_getter.push(["attr_as_list", col.attr_as_list]);

            } else
                    console.error(`no 'data' found for col: ${col.name} - skipping...`);

            /* fill each result for 'col_[type,key]' pair into 'raw_content' */
            var raw_content = new Array();
            for (let item of col_getter) {
                let col_type = item[0];
                let col_key = item[1];

                // newest stuff, automatically dispatch to correct data source
                if (col_type == "auto") {
                    if (col_key === "name") {
                        // "smart" name determination
                        if ("friendly_name" in this.entity.attributes)
                            raw_content.push(this.entity.attributes.friendly_name);
                        else if ("name" in this.entity)
                            raw_content.push(this.entity.name);
                        else if ("name" in this.entity.attributes)
                            raw_content.push(this.entity.attributes.name);
                        else
                            raw_content.push(this.entity.entity_id);
                    } else if (col_key === "object_id") {
                        // return Object ID ('entity_id' after 1st dot)
                        raw_content.push(this.entity.entity_id.split(".").slice(1).join("."));
                    } else if (col_key === "_state" && "state" in this.entity.attributes) {
                        // '_state' denotes 'attributes.state'
                        raw_content.push(this.entity.attributes.state);
                    } else if (col_key === "_name" && "name" in this.entity.attributes) {
                        // '_name' denotes 'attributes.name'
                        raw_content.push(this.entity.attributes.name);
                    } else if (col_key === "icon") {
                        // 'icon' will show the entity's default icon
                        let _icon = this.entity.attributes.icon;
                        raw_content.push(`<ha-icon id="icon" icon="${_icon}"></ha-icon>`);
                    } else if (col_key === "state" && config.auto_format && !col.no_auto_format) {
                        // format entity state
                        raw_content.push(hass.formatEntityState(this.entity));
                    } else if (col_key in this.entity) {
                        // easy direct member of entity, unformatted
                        raw_content.push(this.entity[col_key]);
                    } else if (col_key in this.entity.attributes) {
                        // finally fall back to '.attributes' member
                        if (config.auto_format && !col.no_auto_format) {
                            raw_content.push(hass.formatEntityAttributeValue(this.entity, col_key));
                        }
                        else {
                            raw_content.push(this.entity.attributes[col_key]);
                        }
                    } else if (col_key === "area") {
                        // 'area' will show the entity's or its device's assigned area, if any
                        raw_content.push(this._get_area_name(this.entity.entity_id, hass));
                    } else if (col_key === "floor") {
                        // 'floor' will show the entity's area's floor, if any
                        raw_content.push(this._get_floor_name(this.entity.entity_id, hass));
                    } else if (col_key === "device") {
                        // 'device' will show the entity's device name, if any
                        raw_content.push(this._get_device_name(this.entity.entity_id, hass));
                    } else if (col_key === "device_configuration_url") {
                        // 'device_configuration_url' will show the entity's device configuration URL, if any
                        raw_content.push(this._get_device_value(this.entity.entity_id, hass, "configuration_url"));
                    } else if (col_key === "device_connections") {
                        // 'device_connections' will show the entity's device connections, if any
                        let _dc = this._get_device_value(this.entity.entity_id, hass, "connections");
                        raw_content.push(Array.isArray(_dc) ? JSON.stringify(_dc) : _dc);
                    } else if (col_key === "device_hw_version") {
                        // 'device_hw_version' will show the entity's device hardware version, if any
                        raw_content.push(this._get_device_value(this.entity.entity_id, hass, "hw_version"));
                    } else if (col_key === "device_identifiers") {
                        // 'device_identifiers' will show the entity's device identifiers, if any
                        let _di = this._get_device_value(this.entity.entity_id, hass, "identifiers");
                        raw_content.push(Array.isArray(_di) ? JSON.stringify(_di) : _di);
                    } else if (col_key === "device_manufacturer") {
                        // 'device_manufacturer' will show the entity's device manufacturer, if any
                        raw_content.push(this._get_device_value(this.entity.entity_id, hass, "manufacturer"));
                    } else if (col_key === "device_model") {
                        // 'device_model' will show the entity's device model, if any
                        raw_content.push(this._get_device_value(this.entity.entity_id, hass, "model"));
                    } else if (col_key === "device_serial_number") {
                        // 'device_serial_number' will show the entity's device serial number, if any
                        raw_content.push(this._get_device_value(this.entity.entity_id, hass, "serial_number"));
                    } else if (col_key === "device_sw_version") {
                        // 'device_sw_version' will show the entity's device software version, if any
                        raw_content.push(this._get_device_value(this.entity.entity_id, hass, "sw_version"));
                    } else if (col_key === "device_via_device") {
                        // 'device_via_device' will show the entity's device via name, if any
                        raw_content.push(this._get_device_via(this.entity.entity_id, hass));
                    } else if (col_key === "platform") {
                        // 'platform' will show the entity's platform (domain), if any
                        raw_content.push(this._get_platform(this.entity.entity_id, hass));
                    } else {
                        // no matching data found, complain:
                        //raw_content.push("[[ no match ]]");

                        let pos = col_key.indexOf('.');
                        if (pos < 0)
                        {
                            raw_content.push(null);
                        }
                        else
                        {
                            // if the col_key field contains a dotted object (eg: day.monday)
                            //  then traverse each object to ensure that it exists
                            //  until the final object value is found.
                            // if at any point in the traversal, the object is not found
                            //  then null will be used as the value.
                            // Works for arrays as well as single values.
                            let objs = col_key.split('.');
                            let struct = this.entity.attributes;
                            let values = [];
                            if (struct) {
                                for (let idx = 0; struct && idx < objs.length; idx++) {
                                    if (Array.isArray(struct) && isNaN(objs[idx])) {
                                        struct.forEach(function (item, index) {
                                            values.push(struct[index][objs[idx]]);
                                        });
                                    }
                                    else {
                                        struct = (objs[idx] in struct) ? struct[objs[idx]] : null;
                                    }
                                }
                                // If no array found, single value is in struct.
                                if (values.length == 0) values = struct;
                            }
                            raw_content.push(values);
                        }
                    }

                    // @todo: not really nice to clean `raw_content` up here, why
                    //        putting garbage in it in the 1st place? Need to check
                    //        if this is ever executed, since the data-collection
                    //        improvements...
                    /*raw_content = raw_content.filter(
                        (item) => item !== undefined && item.slice(0, 9) !== 'undefined'
                    );*/

                    // technically all of the above might be handled as list
                    this.has_multiple = Array.isArray(raw_content.slice(-1)[0]);

                ////////// ALL OF THE FOLLOWING TO BE REMOVED ONCE DEPRECATION IS REALIZED....
                //
                // collect the "raw" data from the requested source(s)
                } else if(col_type == "attr") {
                    raw_content.push(((col_key in this.entity.attributes) ?
                        this.entity.attributes[col_key] : null));

                } else if (col_type == "prop") {
                    // 'object_id' and 'name' not working -> make them work:
                    if (col_key == "object_id") {
                        raw_content.push(this.entity.entity_id.split(".").slice(1).join("."));

                    // 'name' automagically resolves to most verbose name
                    } else if (col_key == "name") {
                        if ("friendly_name" in this.entity.attributes)
                            raw_content.push(this.entity.attributes.friendly_name);
                        else if ("name" in this.entity)
                            raw_content.push(this.entity.name);
                        else if ("name" in this.entity.attributes)
                            raw_content.push(this.entity.attributes.name);
                        else
                            raw_content.push(this.entity.entity_id);

                    // other state properties seem to work as expected... (no multiples allowed!)
                    } else
                        raw_content.push((col_key in this.entity) ? this.entity[col_key] : null);

                } else if (col_type == "attr_as_list") {
                    this.has_multiple = true;
                    raw_content.push(this.entity.attributes[col_key]);
                //
                ////////// ... REMOVAL UNTIL THIS POINT HERE (DUE TO DEPRECATION)

                } else {
                    console.error(`no selector found for col: ${col.name} - skipping...`);
                    //raw_content.push("[failed selecting data]");
                }
            }
            /* finally concat all raw_contents together using 'col.multi_delimiter' */
            let delim = (col.multi_delimiter) ? col.multi_delimiter : " ";

            ////////// REMOVE ON DEPRECATION:
            if ("multi" in col && col.multi.length > 1)
                raw_content = raw_content.map((obj) => String(obj)).join(delim);
            // new approach, KEEP AFTER DEPRECATION: (maybe without 'else' working anyways?!)
            else if ("data" in col && raw_content.length > 1)
                raw_content = raw_content.map((obj) => String(obj)).join(delim);
            else
                raw_content = raw_content[0];
            
            return ([null, undefined].every(x => raw_content !== x)) ? raw_content : new Array();
        });
        return null;
    }

    _get_device_name(entity_id, hass) {
        var device_id;
        if (hass.entities[entity_id] != null) {
            device_id = hass.entities[entity_id].device_id;
        }
        return device_id == null ? "-" : hass.devices[device_id].name_by_user || hass.devices[device_id].name;
    }

    _get_device_via(entity_id, hass) {
        var device_id;
        var via_device_id;
        if (hass.entities[entity_id] != null) {
            device_id = hass.entities[entity_id].device_id;
        }
        if (device_id != null) {
            via_device_id = hass.devices[device_id].via_device_id
        }
        return via_device_id == null ? "-" : hass.devices[via_device_id].name_by_user || hass.devices[via_device_id].name;
    }

    _get_device_value(entity_id, hass, parameter) {
        var device_id;
        var device_parameter;
        if (hass.entities[entity_id] != null) {
            device_id = hass.entities[entity_id].device_id;
        }
        if (device_id != null) {
          device_parameter = hass.devices[device_id][parameter];
        }
        return device_id == null || device_parameter == null ||
            (Array.isArray(device_parameter) && device_parameter.length == 0) ? "-" :
              hass.devices[device_id][parameter];
    }

    _get_area_name(entity_id, hass) {
        var area_id;
        if (hass.entities[entity_id] != null) {
            area_id = hass.entities[entity_id].area_id;
            if (area_id == null) {
                let device_id = hass.entities[entity_id].device_id;
                if (device_id != null) area_id = hass.devices[device_id].area_id;
            }
        }
        return area_id == null || hass.areas[area_id] == null ? "-" : hass.areas[area_id].name;
    }

    _get_floor_name(entity_id, hass) {
        var area_id;
        var floor_id;
        if (hass.entities[entity_id] != null) {
            area_id = hass.entities[entity_id].area_id;
            if (area_id == null) {
                let device_id = hass.entities[entity_id].device_id;
                if (device_id != null) area_id = hass.devices[device_id].area_id;
            }
            if (area_id != null) floor_id = hass.areas[area_id].floor_id;
        }
        return floor_id == null || hass.floors[floor_id] == null ? "-" : hass.floors[floor_id].name;
    }

    _get_platform(entity_id, hass) {
        var entity = hass.entities[entity_id]
        return entity == null || entity.platform == null ? "-" : entity.platform;
    }

    render_data(col_cfgs) {
        // apply passed "modify" configuration setting by using eval()
        // assuming the data is available inside the function as "x"
        this.data = this.raw_data.map((raw, idx) => {
            let x = raw;
            let cfg = col_cfgs[idx];
			let fmt = new CellFormatters();
            if (cfg.fmt) {
                x = fmt[cfg.fmt](x);
                if (fmt.failed)
                   x = null;
            }

            let content = (cfg.modify) ? eval(cfg.modify) : x;

            // check for undefined/null values and omit if strict set
            if (content === "undefined" || typeof content === "undefined" || content === null ||
                    content == "null" || (Array.isArray(content) && content.length == 0))
                return ((this.strict) ? null : "n/a");

            return new Object({
                content: content,
                pre: cfg.prefix || "",
                suf: cfg.suffix || "",
                css: cfg.align || "left",
                hide: cfg.hidden,
                raw_content: raw,
                sort_unmodified: cfg.sort_unmodified,
                tap_action: cfg.tap_action,
                double_tap_action: cfg.double_tap_action,
                hold_action: cfg.hold_action,
                edit_action: cfg.edit_action,
            });
        });
        this.hidden = this.data.some(data => (data === null));
        return this;
    };
}

