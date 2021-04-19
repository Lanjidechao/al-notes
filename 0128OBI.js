<template>
    <div class="content">
        <div class="slds-page-header slds-grid">
            <div class="slds-grow slds-grid slds-media_center">
                <lightning-icon icon-name="standard:opportunity" size="small"></lightning-icon>
                <lightning-formatted-text class="custom_title" value="案件基本情報"></lightning-formatted-text>
            </div>
        </div>
        <lightning-record-edit-form record-id={recordId} onload={onload} onsuccess={handlesuccess}
            object-api-name='T_ORDER__c'>
            <lightning-accordion class="slds-size_1-of-1" allow-multiple-sections-open active-section-name={sections}>
                <template if:false={editmode}>
                    <!-- 20201013 halfdev add -->
                    <!-- </div> -->
                    <lightning-accordion-section class="text slds-m-top--small" name="A" label="基本情報">
                        <div class="slds-grid slds-wrap">
                            <div class="slds-size_1-of-2">
                                <!-- slds-grid -->
                                <div class="slds-size_1-of-1 slds-grid">
                                    <div class="field-output">
                                        <lightning-output-field variant="standard" field-name="NO_ORDER__c">
                                        </lightning-output-field>
                                    </div>
                                </div>
                            </div>
                            <div class="slds-size_1-of-2">
                                <!-- slds-grid -->
                                <div class="slds-size_1-of-1 slds-grid">
                                    <div class="field-output">
                                        <lightning-output-field variant="standard" field-name="Name">
                                        </lightning-output-field>
                                    </div>
                                    <!-- icon-output -->
                                    <c-inline-edit-icon show={editableStrict.data} onedit={editMode}>
                                    </c-inline-edit-icon>
                                </div>
                            </div>
                            <!-- 20201106 自主プレゼン　非表示 -->
                            <template if:false={type5.data}>

                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="RF_ORDER_DESIGN__c">
                                            </lightning-output-field>
                                        </div>
                                        <template if:false={notNeedDesign}>
                                            <c-inline-edit-icon show={editable.data} onedit={editMode}>
                                            </c-inline-edit-icon>
                                        </template>
                                    </div>
                                </div>
                            </template>
                            <div class="slds-size_1-of-2">
                                <div class="slds-size_1-of-1 slds-grid">
                                    <div class="field-output">
                                        <lightning-output-field variant="standard" field-name="RF_ORG_USER__c">
                                        </lightning-output-field>
                                    </div>
                                    <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                </div>
                            </div>
                            <!-- 20201106 自主プレゼン　表示 -->
                            <template if:true={type5.data}>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="RF_CLIENT__c">
                                            </lightning-output-field>
                                        </div>
                                        <template if:false={isChildOrder.data}>
                                            <c-inline-edit-icon show={editableStrict.data} onedit={editMode}>
                                            </c-inline-edit-icon>
                                        </template>
                                    </div>
                                </div>
                            </template>
                            <div class="slds-size_1-of-2">
                                <div class="slds-size_1-of-1 slds-grid">
                                    <div class="field-output">
                                        <lightning-output-field variant="standard" field-name="RF_DIV_F__c">
                                        </lightning-output-field>
                                    </div>
                                </div>
                            </div>
                            <template if:true={type5.data}>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="NM_DEPART__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editableStrict.data} onedit={editMode}>
                                        </c-inline-edit-icon>
                                    </div>
                                </div>
                            </template>
                            <template if:false={type5.data}>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="RF_CLIENT__c">
                                            </lightning-output-field>
                                        </div>
                                        <template if:false={isChildOrder.data}>
                                            <c-inline-edit-icon show={editableStrict.data} onedit={editMode}>
                                            </c-inline-edit-icon>
                                        </template>
                                    </div>
                                </div>
                            </template>
                            <div class="slds-size_1-of-2">
                                <div class="slds-size_1-of-1 slds-grid">
                                    <div class="field-output">
                                        <lightning-output-field variant="standard" field-name="TX_BUSINESS_PRODUCER__c">
                                        </lightning-output-field>
                                    </div>
                                </div>
                            </div>
                            <!-- 20200831 社内社外クライアント区分 -->
                            <!-- 社内 -->
                            <div class="slds-size_1-of-2">
                                <div class="slds-size_1-of-1 slds-grid">
                                    <div class="field-output">
                                        <template if:true={outter}>
                                            <lightning-output-field variant="standard" field-name="RF_CONTACT__c">
                                            </lightning-output-field>
                                        </template>
                                        <template if:false={outter}>
                                            <lightning-output-field variant="standard" field-name="RF_ORG_CONTACT__c">
                                            </lightning-output-field>
                                        </template>
                                    </div>
                                    <c-inline-edit-icon show={editableStrict.data} onedit={editMode}>
                                    </c-inline-edit-icon>
                                </div>
                            </div>
                            <template if:false={type5.data}>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="NM_DEPART__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editableStrict.data} onedit={editMode}>
                                        </c-inline-edit-icon>
                                    </div>
                                </div>
                            </template>

                            <div class="slds-size_1-of-2">
                                <div class="slds-size_1-of-1 slds-grid">
                                    <div class="field-output">
                                        <lightning-output-field variant="standard" field-name="TY_SOURCE_DEPART__c">
                                        </lightning-output-field>
                                    </div>
                                    <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                </div>
                            </div>
                            <template if:true={type5.data}>
                                <div class="slds-size--1-of-2">
                                    <div class="slds-size--1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="RF_SPONSOR__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editableStrict.data} onedit={editMode}>
                                        </c-inline-edit-icon>
                                    </div>
                                </div>
                            </template>
                            <template if:true={type5.data}>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="DT_PLAN_ACCEPTED__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editableStrict.data} onedit={editMode}>
                                        </c-inline-edit-icon>
                                    </div>
                                </div>
                            </template>
                            <!-- 20200925 add　自主プレゼン案件-->
                            <template if:true={type5.data}>
                                <div class="slds-size--1-of-2">
                                    <div class="slds-size--1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="AM_ACCEPTED__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <!-- <label class="slds-form-element__label" for="form-element-01">通貨</label>  -->
                                            <lightning-output-field variant="standard" field-name="TX_Currency__c">
                                            </lightning-output-field>
                                            <!-- <lightning-output-field field-name="CurrencyIsoCode"></lightning-output-field> -->
                                        </div>
                                        <!-- <template if:true={orderAmountEdittable.data}> -->
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                        <!-- </template> -->
                                    </div>
                                </div>
                                <template if:false={type5.data}>
                                    <div class="slds-size--1-of-2">
                                        <div class="slds-size--1-of-1 slds-grid">
                                            <div class="field-output">
                                                <lightning-output-field variant="standard" field-name="RF_APPROVAL__c">
                                                </lightning-output-field>
                                            </div>
                                            <c-inline-edit-icon show={editable.data} onedit={editMode}>
                                            </c-inline-edit-icon>
                                        </div>
                                    </div>
                                </template>
                                <template if:false={type5.data}>
                                    <div class="slds-size--1-of-2">
                                        <div class="slds-size--1-of-1 slds-grid">
                                            <div class="field-output">
                                                <lightning-output-field variant="standard" field-name="DT_RESULT__c">
                                                </lightning-output-field>
                                            </div>
                                            <c-inline-edit-icon show={editable.data} onedit={editMode}>
                                            </c-inline-edit-icon>
                                        </div>
                                    </div>
                                    <div class="slds-size--1-of-2">
                                        <div class="slds-size--1-of-1 slds-grid">
                                            <div class="field-output">
                                                <lightning-output-field variant="standard" field-name="DT_PRESENT__c">
                                                </lightning-output-field>
                                            </div>
                                            <c-inline-edit-icon show={editable.data} onedit={editMode}>
                                            </c-inline-edit-icon>
                                        </div>
                                    </div>
                                </template>
                            </template>
                            <template if:false={type5.data}>
                                <div class="slds-size--1-of-2">
                                    <div class="slds-size--1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="RF_SPONSOR__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editableStrict.data} onedit={editMode}>
                                        </c-inline-edit-icon>
                                    </div>
                                </div>
                            </template>
                            <template if:false={type5.data}>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <template if:true={outter}>
                                                <lightning-output-field variant="standard"
                                                    field-name="RF_KEY_CONTACT__c"></lightning-output-field>
                                            </template>
                                            <template if:false={outter}>
                                                <lightning-output-field variant="standard"
                                                    field-name="RF_KEY_CONTACT_INNER__c"></lightning-output-field>
                                            </template>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                            </template>
                            <!-- 0930, type5.data do not show next two fields -->
                            <template if:false={type5.data}>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="RF_REQ_CUSTOMER__c">
                                            </lightning-output-field>
                                        </div>
                                        <template if:false={isChildOrder.data}>
                                            <c-inline-edit-icon show={editableStrict.data} onedit={editMode}>
                                            </c-inline-edit-icon>
                                        </template>
                                    </div>
                                </div>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <template if:true={outter}>
                                                <lightning-output-field variant="standard"
                                                    field-name="RF_REQ_CONTACT__c"></lightning-output-field>
                                            </template>
                                            <template if:false={outter}>
                                                <lightning-output-field variant="standard"
                                                    field-name="RF_REQ_CONTACT_INNER__c"></lightning-output-field>
                                            </template>
                                        </div>
                                        <c-inline-edit-icon show={editableStrict.data} onedit={editMode}>
                                        </c-inline-edit-icon>
                                    </div>
                                </div>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="AM_ORDER__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <!-- <label class="slds-form-element__label" for="form-element-01">通貨</label>  -->
                                            <lightning-output-field variant="standard" field-name="TX_Currency__c">
                                            </lightning-output-field>
                                            <!-- <lightning-output-field field-name="CurrencyIsoCode"></lightning-output-field> -->
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                            </template>
                            <!-- 20200821 -->
                            <template if:false={type5.data}>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="AM_ORDER_JPY__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <!-- 20201127 reorder the fields -->

                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="DT_PLAN_ACCEPTED__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editableStrict.data} onedit={editMode}>
                                        </c-inline-edit-icon>
                                    </div>
                                </div>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="DT_ACCEPTED__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editableStrict.data} onedit={editMode}>
                                        </c-inline-edit-icon>
                                    </div>
                                </div>
                            </template>
                            <div class="slds-size_1-of-2">
                                <div class="slds-size_1-of-1 slds-grid">
                                    <div class="field-output">
                                        <lightning-output-field variant="standard" field-name="DT_ORDER_START__c">
                                        </lightning-output-field>
                                    </div>
                                    <c-inline-edit-icon show={editableStrict.data} onedit={editMode}>
                                    </c-inline-edit-icon>
                                </div>
                            </div>
                            <div class="slds-size_1-of-2">
                                <div class="slds-size_1-of-1 slds-grid">
                                    <div class="field-output">
                                        <lightning-output-field variant="standard" field-name="DT_ORDER_FINISH__c">
                                        </lightning-output-field>
                                    </div>
                                    <c-inline-edit-icon show={editableStrict.data} onedit={editMode}>
                                    </c-inline-edit-icon>
                                </div>
                            </div>
                            <template if:true={type5.data}>
                                <div class="slds-size--1-of-2">
                                    <div class="slds-size--1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="DT_PRESENT__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <div class="slds-size--1-of-2">
                                    <div class="slds-size--1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="DT_RESULT__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                            </template>
                            <template if:false={type5.data}>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard"
                                                field-name="DT_REGION_PERIOD_START__c"></lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard"
                                                field-name="DT_REGION_PERIOD_END__c"></lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                            </template>
                            <template if:false={type5.data}>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="RF_PARENT_ORDER__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="TX_COURS__c">
                                            </lightning-output-field>
                                        </div>
                                    </div>
                                </div>
                                <!-- 20201206 remove to previous field -->
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="RF_QUOTE_ASK__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="ST_STAGE__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                            </template>

                            <div class="slds-size_1-of-2">
                                <div class="slds-size_1-of-1 slds-grid">
                                    <div class="field-output">
                                        <lightning-output-field variant="standard" field-name="TY_REGION__c">
                                        </lightning-output-field>
                                    </div>
                                    <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                </div>
                            </div>
                            <div class="slds-size_1-of-2">
                                <div class="slds-size_1-of-1 slds-grid">
                                    <div class="field-output">
                                        <lightning-output-field variant="standard" field-name="TY_DIFF__c">
                                        </lightning-output-field>
                                    </div>
                                    <c-inline-edit-icon show={editableStrict.data} onedit={editMode}>
                                    </c-inline-edit-icon>
                                </div>
                            </div>
                            <template if:true={type5.data}>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="ST_STAGE__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                            </template>
                            <template if:false={type5.data}>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="ST_ORDER_SUB__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <!-- 0930 not show next field -->
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <label class="slds-form-element__label" for="form-element-01">発注申請</label>
                                            <lightning-output-field variant="label-hidden"
                                                field-name="RF_SEND_ORDER__c"></lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <!-- 20201206 template remove to next field -->
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="RT_POSSIBILITY__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                            </template>
                            <div class="slds-size_1-of-2">
                                <div class="slds-size_1-of-1 slds-grid">
                                    <div class="field-output slds-grid slds-grid_vertical slds-media"
                                        style="border-bottom: 1px solid rgb(221, 219, 218)">
                                        <label class="slds-form-element__label" for="form-element-01">案件タイプ</label>
                                        <lightning-formatted-text value={recordTypeName}></lightning-formatted-text>
                                    </div>
                                    <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                </div>
                            </div>
                        </div>
                    </lightning-accordion-section>
                    <div class={isType5}>
                        <lightning-accordion-section class="text" name="type5" label="目的&#38;期待できる効果">
                            <div class="slds-size--1-of-1">
                                <div class="slds-size--1-of-1 slds-grid">
                                    <div class="field-output">
                                        <lightning-output-field variant="standard" field-name="TX_EFFECT__c">
                                        </lightning-output-field>
                                    </div>
                                    <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                </div>
                            </div>
                        </lightning-accordion-section>
                    </div>
                    <lightning-accordion-section class="text" name="B" label="クライアントニーズ&#38;サービス">

                        <div class="slds-grid slds-wrap">
                            <div class="slds-size_1-of-2">
                                <div class="slds-size_1-of-1 slds-grid">
                                    <div class="field-output">
                                        <lightning-output-field variant="standard" field-name="TY_EFFECT__c">
                                        </lightning-output-field>
                                    </div>
                                    <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                </div>
                            </div>
                            <div class="slds-size_1-of-2">
                                <div class="slds-size_1-of-1 slds-grid">
                                    <div class="field-output">
                                        <lightning-output-field variant="standard" field-name="TY_MAIN_USE__c">
                                        </lightning-output-field>
                                    </div>
                                    <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                </div>
                            </div>
                            <div class="slds-size_1-of-2">
                                <div class="slds-size_1-of-1 slds-grid">
                                    <div class="field-output">
                                        <lightning-output-field variant="standard" field-name="TX_REMARK__c">
                                        </lightning-output-field>
                                    </div>
                                    <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                </div>
                            </div>
                            <div class="slds-size_1-of-2">
                                <div class="slds-size_1-of-1 slds-grid">
                                    <div class="field-output">
                                        <lightning-output-field variant="standard" field-name="TY_USAGE__c">
                                        </lightning-output-field>
                                    </div>
                                    <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                </div>
                            </div>
                            <template if:false={type2.data}>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="TY_SERVICE__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                            </template>
                        </div>

                    </lightning-accordion-section>
                    <lightning-accordion-section class="text" name="C" label="案件情報開示範囲">
                        <div class="slds-grid slds-wrap">
                            <template if:false={type5.data}>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard"
                                                field-name="DT_SECRET_OUTSIDE__c"></lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                            </template>
                            <div class="slds-size_1-of-2">
                                <div class="slds-size_1-of-1 slds-grid">
                                    <div class="field-output">
                                        <lightning-output-field variant="standard" field-name="FL_TOP_SECRET__c">
                                        </lightning-output-field>
                                    </div>
                                    <c-inline-edit-icon show={editableStrict.data} onedit={editMode}>
                                    </c-inline-edit-icon>
                                </div>
                            </div>
                        </div>
                    </lightning-accordion-section>
                    <template if:false={type5.data}>
                        <lightning-accordion-section class="text" name="D" label="売上金額関連">
                            <div class="slds-grid slds-wrap">
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="AM_PRE_QUOTE__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <!-- 20201014 add currencycode -->
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="AM_PRE_QUOTE_JPY__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="AM_PRE_QUOTE_CUR__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard"
                                                field-name="AM_ORDER_ACCEPTED__c"></lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard"
                                                field-name="AM_ORDER_ACCEPTED_JPY__c"></lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard"
                                                field-name="AM_ORDER_ACCEPTED_CUR__c"></lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="AM_MID_QUOTE__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="AM_MID_QUOTE_JPY__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="AM_MID_QUOTE_CUR__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard"
                                                field-name="AM_ADVANCE_REQUESTED__c"></lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard"
                                                field-name="AM_ADVANCE_REQUESTED_JPY__c"></lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard"
                                                field-name="AM_ADVANCE_REQUESTED_CUR__c"></lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="AM_SALES_FIXED__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard"
                                                field-name="AM_SALES_FIXED_JPY__c"></lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard"
                                                field-name="AM_SALES_FIXED_CUR__c"></lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="AM_REQUEST__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="AM_REQUEST_JPY__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="AM_REQUEST_CUR__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>

                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="AM_DEPOSITED__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <div class="slds-size_1-of-2">
                                    <div class="slds-size_1-of-1 slds-grid">
                                        <div class="field-output">
                                            <lightning-output-field variant="standard" field-name="AM_DEPOSITED_JPY__c">
                                            </lightning-output-field>
                                        </div>
                                        <c-inline-edit-icon show={editable.data} onedit={editMode}></c-inline-edit-icon>
                                    </div>
                                </div>
                                <template if:true={loaded}>
                                    <div class="slds-size_1-of-2">
                                        <div class="slds-size_1-of-1 slds-grid">
                                            <div class="field-output">
                                                <lightning-output-field variant="standard"
                                                    field-name="AM_DEPOSITED_CUR__c"></lightning-output-field>
                                            </div>
                                            <c-inline-edit-icon show={editable.data} onedit={editMode}>
                                            </c-inline-edit-icon>
                                        </div>
                                    </div>
                                </template>
                                <template if:false={loaded}>
                                    <lightning-spinner alternative-text="Loading"></lightning-spinner>
                                </template>
                            </div>
                        </lightning-accordion-section>
                    </template>
                </template>
            </lightning-accordion>
            <template if:true={editmode}>
                <lightning-accordion class="slds-size_1-of-1" allow-multiple-sections-open
                    active-section-name={sections}>
                    <div class="edit-box">
                        <lightning-messages>
                        </lightning-messages>
                        <lightning-accordion-section class="text" name="A" label="基本情報">
                            <div class="slds-grid slds-wrap">
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" required disabled={disableStrict}
                                        field-name="NO_ORDER__c"></lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" required disabled={disableStrict}
                                        field-name="Name"></lightning-input-field>
                                </div>
                                <template if:false={type5.data}>
                                    <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                        <c-look-up
                                            data-id="designLookUp"
                                            selection={designInitialSelection}
                                            errors={designErrors}
                                            onsearch={handleDesignLookupSearch}
                                            scroll-after-n-items="10"
                                            onselectionchange={handleDesignLookupSelectionChange}
                                            label="案件デザイン"
                                            placeholder="案件デザインを検索"
                                            is-multi-entry={isCustomerMultiEntry}
                                            default-init-results={designDefaultResults}
                                            required={designLookupRequire}
                                            disabled={designDisabled}
                                            >
                                        </c-look-up>
                                        <!-- <c-custom-pick-list onselect={orderDesignSelect} data-select="clear"
                                            disable-strict={notNeedDesign} select-record-name={orderDesignLabel}
                                            object-name="案件デザイン" filter-label="案件デザイン" icon-name="action:new_account"
                                            filtered-records={orderDesignRecords} save-records={saveOrderDesignRecords}>
                                            ></c-custom-pick-list> -->
                                        <!-- <lightning-input-field variant="standard" field-name="RF_ORDER_DESIGN__c"></lightning-input-field> -->
                                    </div>
                                </template>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" onchange={orgChange}
                                        field-name="RF_ORG_USER__c"></lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" disabled field-name="RF_DIV_F__c">
                                    </lightning-input-field>
                                </div>
                                <template if:false={type5.data}>
                                    <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                        <lightning-input-field variant="standard" field-name="RF_AS_ORG_USER__c">
                                        </lightning-input-field>
                                    </div>
                                    <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                        <!-- proxy, occupied area -->
                                    </div>
                                </template>
                                <template if:true={type5.data}>
                                    <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                        <lightning-input-field variant="standard" disabled={disableStrict}
                                            field-name="NM_DEPART__c"></lightning-input-field>
                                    </div>
                                </template>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <c-look-up
                                        data-id="customerLookUp"
                                        selection={customerInitialSelection}
                                        errors={customerErrors}
                                        onsearch={handleCustomerLookupSearch}
                                        scroll-after-n-items="10"
                                        onselectionchange={handleCustomerLookupSelectionChange}
                                        label="クライアント"
                                        placeholder="クライアントを検索"
                                        is-multi-entry={isCustomerMultiEntry}
                                        new-record-options={newCustomerRecordOptions}
                                        default-init-results={customerDefaultResults}
                                        required
                                    >
                                    </c-look-up>
                                  </div>
                                <!-- new client modal -->

                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="TX_BUSINESS_PRODUCER__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="TY_SOURCE_DEPART__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <!-- proxy -->
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" disabled={disableStrict}
                                        field-name="NM_DEPART__c"></lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <!-- 20200909 new contact feat -->
                                    <!-- outter new contact -->
                                    <template if:true={outter}>
                                        <div class="icon-output slds-grid slds-media_center icon-new slds-is-absolute">
                                            <span onclick={newContact} class="add-icon-opacity absolute-position-right">
                                                <lightning-icon icon-name="utility:add" size="xx-small">
                                                </lightning-icon>
                                            </span>
                                        </div>
                                    </template>
                                    <!-- inner new contact -->
                                    <template if:false={outter}>
                                        <div class="icon-output slds-grid slds-media_center icon-new slds-is-absolute">
                                            <span onclick={newOrgUser} class="add-icon-opacity absolute-position-right">
                                                <lightning-icon icon-name="utility:add" size="xx-small">
                                                </lightning-icon>
                                            </span>
                                        </div>
                                    </template>
                                    <!-- <lightning-input-field field-name="RF_CONTACT__c"></lightning-input-field> -->
                                    <!-- 20200828 filtered picklist feat -->
                                    <c-look-up
                                            data-id="contactLookUp"
                                            selection={contactInitialSelection}
                                            errors={contactErrors}
                                            onsearch={handleContactLookupSearch}
                                            scroll-after-n-items="10"
                                            onselectionchange={handleContactLookupSelectionChange}
                                            label="クライアント担当者"
                                            placeholder="クライアント担当者を検索"
                                            is-multi-entry={isContactMultiEntry}
                                            new-record-options={newContactRecordOptions}
                                            disabled={contactsEditable}
                                        >
                                    </c-look-up>
                                </div>
                                <!-- 20200925 -->
                                <template if:true={type5.data}>
                                    <div class="slds-size--1-of-2 slds-p-right--medium">
                                        <lightning-input-field variant="standard" field-name="DT_PRESENT__c">
                                        </lightning-input-field>
                                    </div>
                                    <div class="slds-size--1-of-2 slds-p-right--medium">
                                        <lightning-input-field variant="standard" field-name="DT_RESULT__c">
                                        </lightning-input-field>
                                    </div>
                                    <div class="slds-size--1-of-2 slds-p-right--medium">
                                        <lightning-input-field variant="standard" field-name="TX_EFFECT__c">
                                        </lightning-input-field>
                                    </div>
                                    <div class="slds-size--1-of-2 slds-p-right--medium">
                                        <lightning-input-field variant="standard" field-name="AM_ACCEPTED__c">
                                        </lightning-input-field>
                                    </div>
                                </template>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <div class="icon-output slds-grid slds-media_center icon-new slds-is-absolute">
                                        <span onclick={newSponsor} class="add-icon-opacity absolute-position">
                                            <lightning-icon icon-name="utility:add" size="xx-small"></lightning-icon>
                                        </span>
                                    </div>
                                    <lightning-input-field variant="standard" disabled={disableStrict}
                                        field-name="RF_SPONSOR__c"></lightning-input-field>
                                </div>
                                <!-- 20201210 key contact to custompicklist-->
                                <!-- <div class="slds-size_1-of-2 slds-var-p-right_medium">
                            <lightning-input-field variant="standard" field-name="RF_KEY_CONTACT__c"></lightning-input-field>
                        </div> -->
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <c-look-up
                                            data-id="keyLookUp"
                                            selection={keyInitialSelection}
                                            errors={keyErrors}
                                            onsearch={handleKeyLookupSearch}
                                            scroll-after-n-items="10"
                                            onselectionchange={handleKeyLookupSelectionChange}
                                            label="キーパーソン"
                                            placeholder="キーパーソンを検索"
                                            is-multi-entry={isKeyMultiEntry}
                                            new-record-options={newKeyRecordOptions}
                                    >
                                    </c-look-up>
                                    <!-- <template if:true={outter}>
                                        <c-custom-pick-list onselect={keyPersonOutSelect}
                                            select-record-name={keyPersonOutLabel} object-name="キーパーソン"
                                            filter-label="キーパーソン" icon-name="action:new_account"
                                            filtered-records={keyPersonOut} save-records={saveKeyPersonOut}>
                                            ></c-custom-pick-list>
                                    </template>
                                    <template if:false={outter}>
                                        <c-custom-pick-list onselect={keyPersonInnerSelect}
                                            select-record-name={keyPersonInnerLabel} object-name="キーパーソン"
                                            filter-label="キーパーソン" icon-name="action:new_account"
                                            filtered-records={keyPersonInner} save-records={saveKeyPersonInner}>
                                            ></c-custom-pick-list>
                                    </template> -->
                                </div>
                                <!-- 0930 type5 do not show next 2 fields -->
                                <template if:false={type5.data}>
                                    <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                        <template if:false={isChildOrder.data}>
                                            <lightning-input-field disabled={disableStrict} variant="standard"
                                                field-name="RF_REQ_CUSTOMER__c"></lightning-input-field>
                                        </template>
                                        <template if:true={isChildOrder.data}>
                                            <lightning-input-field disabled variant="standard"
                                                field-name="RF_REQ_CUSTOMER__c"></lightning-input-field>
                                        </template>
                                    </div>
                                    <!-- 20201210 req contact to custompicklist -->
                                    <!-- <div class="slds-size_1-of-2 slds-var-p-right_medium">
                            <lightning-input-field variant="standard" field-name="RF_REQ_CONTACT__c"></lightning-input-field>
                        </div> -->
                                    <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                        <c-look-up
                                            data-id="requestLookUp"
                                            selection={requestInitialSelection}
                                            errors={requestErrors}
                                            onsearch={handleRequestLookupSearch}
                                            scroll-after-n-items="10"
                                            onselectionchange={handleRequestLookupSelectionChange}
                                            label="請求先担当者"
                                            placeholder="請求先担当者を検索"
                                            is-multi-entry={isRequestMultiEntry}
                                            new-record-options={newRequestRecordOptions}
                                            disabled={requestEditable}
                                        >
                                        </c-look-up>
                                        <!-- <template if:true={outter}>
                                            <c-custom-pick-list onselect={reqContactOutSelect}
                                                disable-strict={disableStrict} select-record-name={reqContactOutLabel}
                                                object-name="請求先担当者" filter-label="請求先担当者"
                                                icon-name="action:new_account" filtered-records={reqContactOut}
                                                save-records={saveReqContactOut}>
                                                ></c-custom-pick-list>
                                        </template>
                                        <template if:false={outter}>
                                            <c-custom-pick-list onselect={reqContactInnerSelect}
                                                disable-strict={disableStrict} select-record-name={reqContactInnerLabel}
                                                object-name="請求先担当者" filter-label="請求先担当者"
                                                icon-name="action:new_account" filtered-records={reqContactInner}
                                                save-records={saveReqContactInner}>
                                                ></c-custom-pick-list>
                                        </template> -->
                                    </div>
                                </template>
                                <template if:true={orderAmountEdittable.data}>
                                    <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                        <lightning-input-field variant="standard" field-name="AM_ORDER__c">
                                        </lightning-input-field>
                                    </div>
                                </template>

                                <template if:true={type5.data}>
                                    <div class="slds-size--1-of-2 slds-p-right--medium">
                                        <lightning-input-field variant="standard" disabled field-name="AM_ORDER__c">
                                        </lightning-input-field>
                                    </div>
                                </template>
                                <template if:false={type5.data}>
                                    <template if:false={orderAmountEdittable.data}>
                                        <div class="slds-size--1-of-2 slds-p-right--medium">
                                            <lightning-input-field variant="standard" disabled field-name="AM_ORDER__c">
                                            </lightning-input-field>
                                        </div>
                                    </template>
                                </template>
                                <!-- <div class="slds-size_1-of-2 slds-var-p-right_medium" style="padding-left:0.25rem">
                            <label class="slds-form-element__label" for="form-element-01">通貨</label> 
                            <lightning-input-field variant="label-hidden" field-name="CurrencyIsoCode"></lightning-input-field>
                        </div> -->
                                <template if:true={orderAmountEdittable.data}>
                                    <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                        <lightning-input-field variant="standard" field-name="TX_Currency__c">
                                        </lightning-input-field>
                                    </div>
                                </template>
                                <template if:true={orderAmountEdittable.data}>
                                    <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                        <lightning-input-field variant="standard" field-name="AM_ORDER_JPY__c">
                                        </lightning-input-field>
                                    </div>
                                </template>
                                <template if:false={orderAmountEdittable.data}>
                                    <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                        <lightning-input-field disabled variant="standard" field-name="TX_Currency__c">
                                        </lightning-input-field>
                                    </div>
                                </template>
                                <template if:false={orderAmountEdittable.data}>
                                    <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                        <lightning-input-field disabled variant="standard" field-name="AM_ORDER_JPY__c">
                                        </lightning-input-field>
                                    </div>
                                </template>
                                <template if:false={type5.data}>
                                    <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                        <lightning-input-field variant="standard" field-name="RF_PARENT_ORDER__c">
                                        </lightning-input-field>
                                    </div>
                                </template>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" disabled={disableStrict}
                                        field-name="DT_PLAN_ACCEPTED__c"></lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" disabled={disableStrict}
                                        field-name="DT_ACCEPTED__c"></lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" disabled={disableStrict}
                                        field-name="DT_ORDER_START__c"></lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" disabled={disableStrict}
                                        field-name="DT_ORDER_FINISH__c"></lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="DT_REGION_PERIOD_START__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="DT_REGION_PERIOD_END__c">
                                    </lightning-input-field>
                                </div>

                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="TX_COURS__c">
                                    </lightning-input-field>
                                </div>
                                <!-- 0930 type5.data not show next 2 fields -->
                                <template if:false={type5.data}>

                                    <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                        <lightning-input-field variant="standard" field-name="RF_QUOTE_ASK__c">
                                        </lightning-input-field>
                                    </div>
                                </template>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="ST_STAGE__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="TY_REGION__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" disabled={disableStrict}
                                        field-name="TY_DIFF__c"></lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <c-custom-look-up 
                                    data-id="status"
                                    onselect={lookUpSelect} 
                                    filter-label="サブステータス"
                                    >
                                    </c-custom-look-up>
                                    <!-- <lightning-input-field variant="standard" field-name="ST_ORDER_SUB__c"></lightning-input-field> -->
                                </div>
                                <!-- 0930 not show next field -->
                                <template if:false={type5.data}>
                                    <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                        <lightning-input-field variant="standard" field-name="RF_SEND_ORDER__c">
                                        </lightning-input-field>
                                    </div>
                                </template>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" disabled field-name="RT_POSSIBILITY__c"
                                        value={possibility}></lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <label class="slds-form-element__label" for="form-element-01">案件タイプ</label>
                                    <lightning-input variant="label-hidden" value={recordTypeName} disabled>
                                    </lightning-input>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium"
                                    style="visibility: hidden;height: 1px">
                                    <lightning-input-field variant="standard" field-name="ST_ORDER_SUB_CONTROL__c">
                                    </lightning-input-field>
                                </div>

                            </div>
                        </lightning-accordion-section>
                        <lightning-accordion-section class="text" name="B" label="クライアントニーズ&#38;サービス">
                            <div class="slds-grid slds-wrap">
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="TY_EFFECT__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="TY_MAIN_USE__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="TX_REMARK__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="TY_USAGE__c">
                                    </lightning-input-field>
                                </div>
                                <template if:false={type2.data}>
                                    <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                        <lightning-dual-listbox name="languages" label="サービス" source-label="選択可能"
                                            selected-label="選択済" disable-reordering options={options}
                                            value={serviceArray} size="5" onchange={serviceChange}>
                                        </lightning-dual-listbox>
                                        <!-- <lightning-input-field variant="standard" field-name="TY_SERVICE__c"></lightning-input-field> -->
                                    </div>
                                </template>
                            </div>
                        </lightning-accordion-section>
                        <lightning-accordion-section class="text" name="C" label="案件情報開示範囲">
                            <div class="slds-grid slds-wrap">
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="DT_SECRET_OUTSIDE__c">
                                    </lightning-input-field>
                                </div>
                                <!-- <div class="slds-size-/-1-of-2 slds-p-right-/-medium">
                            <lightning-input-field variant="standard" field-name="DT_SECRET_INSIDE__c"></lightning-input-field>
                        </div> -->
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" disabled={disableStrict}
                                        field-name="FL_TOP_SECRET__c"></lightning-input-field>
                                </div>
                            </div>
                        </lightning-accordion-section>
                        <lightning-accordion-section class="text" name="D" label="売上金額関連">
                            <div class="slds-grid slds-wrap">
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="AM_PRE_QUOTE__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="AM_PRE_QUOTE_JPY__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="AM_PRE_QUOTE_CUR__c">
                                    </lightning-input-field>
                                </div>
                                <!-- <div class="slds-size-/-1-of-2 slds-p-right-/-medium">
                            <lightning-input-field variant="standard" field-name="AM_PRE_QUOTE__c"></lightning-input-field>
                        </div> -->
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="AM_ORDER_ACCEPTED__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="AM_ORDER_ACCEPTED_JPY__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="AM_ORDER_ACCEPTED_CUR__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="AM_MID_QUOTE__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="AM_MID_QUOTE_JPY__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="AM_MID_QUOTE_CUR__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="AM_ADVANCE_REQUESTED__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="AM_ADVANCE_REQUESTED_JPY__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="AM_ADVANCE_REQUESTED_CUR__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="AM_SALES_FIXED__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="AM_SALES_FIXED_JPY__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="AM_SALES_FIXED_CUR__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="AM_REQUEST__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="AM_REQUEST_JPY__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="AM_REQUEST_CUR__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="AM_DEPOSITED__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="AM_DEPOSITED_JPY__c">
                                    </lightning-input-field>
                                </div>
                                <div class="slds-size_1-of-2 slds-var-p-right_medium">
                                    <lightning-input-field variant="standard" field-name="AM_DEPOSITED_CUR__c">
                                    </lightning-input-field>
                                </div>
                                <lightning-input-field style="visibility:hidden;height:1px" value={service}
                                    field-name="TY_SERVICE__c"></lightning-input-field>
                                <lightning-input-field style="visibility:hidden;height:1px" value={contact}
                                    field-name="RF_CONTACT__c"></lightning-input-field>
                                <lightning-input-field style="visibility:hidden;height:1px" value={orguser}
                                    field-name="RF_ORG_CONTACT__c"></lightning-input-field>
                                <lightning-input-field style="visibility:hidden;height:1px" value={client}
                                    field-name="RF_CLIENT__c"></lightning-input-field>
                                <!-- 20201210 outter/inner keyperson and reqContact -->
                                <lightning-input-field style="visibility:hidden;height:1px" value={reqout}
                                    field-name="RF_REQ_CONTACT__c"></lightning-input-field>
                                <lightning-input-field style="visibility:hidden;height:1px" value={reqinner}
                                    field-name="RF_REQ_CONTACT_INNER__c"></lightning-input-field>
                                <lightning-input-field style="visibility:hidden;height:1px" value={keyout}
                                    field-name="RF_KEY_CONTACT__c"></lightning-input-field>
                                <lightning-input-field style="visibility:hidden;height:1px" value={keyinner}
                                    field-name="RF_KEY_CONTACT_INNER__c"></lightning-input-field>
                                <lightning-input-field style="visibility:hidden;height:1px" value={substatus}
                                    field-name="ST_ORDER_SUB__c"></lightning-input-field>
                                <lightning-input-field style="visibility:hidden;height:1px" value={orderdesign}
                                    field-name="RF_ORDER_DESIGN__c"></lightning-input-field>
                            </div>
                        </lightning-accordion-section>
                        <div class="slds-modal__footer footer-sticky" style="display:flex;justify-content:center;">
                            <lightning-button variant="neutral" class="slds-var-m-horizontal_xx-small" label="キャンセル"
                                onclick={handleCancel}></lightning-button>
                            <lightning-button variant="brand" class="slds-var-m-horizontal_xx-small" label="保存"
                                type="submit"></lightning-button>
                        </div>
                    </div>
                </lightning-accordion>
            </template>
        </lightning-record-edit-form>
        <!-- new client in edit mode -->
        <template if:true={newclient}>
            <!-- <div class="demo-only" style="height: 640px;"> -->
            <section role="dialog" tabindex="-1" aria-labelledby="modal-heading-01" aria-modal="true"
                aria-describedby="modal-content-id-1"
                class="slds-modal slds-modal_medium fadeInDown TwoAnimated slds-fade-in-open">
                <div class="slds-modal__container">
                    <header class="slds-modal__header">
                        <button class="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse"
                            title="クローズ" onclick={closeNewClient}>
                            <lightning-icon icon-name="utility:close" size="medium">
                            </lightning-icon>
                            <span class="slds-assistive-text">クローズ</span>
                        </button>
                        <h2 id="modal-heading-01" class="slds-text-heading_medium slds-hyphenate">クライアントを新規</h2>
                    </header>
                    <div class="slds-modal__content slds-var-p-around_medium" id="modal-content-id-1">
                        <lightning-record-edit-form object-api-name="M_CUSTOMER__c" onsuccess={handleClientSuccess}>
                            <lightning-messages></lightning-messages>
                            <div class="slds-grid slds-wrap">
                                <div class="slds-size_1-of-1 slds-var-m-horizontal_large slds-grid slds-wrap">
                                    <lightning-input-field variant="standard" required
                                        class="slds-size_3-of-7 slds-var-m-right_xx-large" field-name='Name'>
                                    </lightning-input-field>
                                    <div style="visibility:hidden"><button class="fakesubmit" type="submit"></button>
                                    </div>
                                    <!-- 
                                        <div class="slds-m-top_medium">
                                            <lightning-button variant="brand" type="submit" name="save" label="Create Contact">
                                            </lightning-button>
                                        </div> -->
                                </div>
                            </div>
                        </lightning-record-edit-form>
                    </div>
                    <footer class="slds-modal__footer">
                        <lightning-button label="キャンセル" variant="neutral" onclick={closeNewClient}></lightning-button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <lightning-button label="新規" variant="brand" onclick={newClientInEdit}></lightning-button>
                    </footer>
                </div>
            </section>
            <div class="slds-backdrop slds-backdrop_open"></div>
            <!-- </div> -->
        </template>
        <!-- new contact in edit mode -->
        <template if:true={newcontact}>
            <!-- <div class="demo-only" style="height: 640px;"> -->
            <section role="dialog" tabindex="-1" aria-labelledby="modal-heading-01" aria-modal="true"
                aria-describedby="modal-content-id-1"
                class="slds-modal slds-modal_medium fadeInDown TwoAnimated slds-fade-in-open">
                <div class="slds-modal__container">
                    <header class="slds-modal__header">
                        <button class="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse"
                            title="クローズ" onclick={closeNewContact}>
                            <lightning-icon icon-name="utility:close" size="medium">
                            </lightning-icon>
                            <span class="slds-assistive-text">クローズ</span>
                        </button>
                        <h2 id="modal-heading-02" class="slds-text-heading_medium slds-hyphenate">クライアント担当者を新規</h2>
                    </header>
                    <div class="slds-modal__content slds-var-p-around_medium" id="modal-content-id-2">
                        <lightning-record-edit-form object-api-name="T_CONTACT__c" onsuccess={handleContactSuccess}>
                            <lightning-messages></lightning-messages>
                            <div class="slds-grid slds-wrap">
                                <div class="slds-size_1-of-1 slds-var-m-horizontal_large slds-grid slds-wrap">
                                    <lightning-input-field variant="standard" required
                                        class="slds-size_3-of-7 slds-var-m-right_xx-large" field-name='Name'>
                                    </lightning-input-field>
                                    <lightning-input-field variant="standard"
                                        class="slds-size_3-of-7 slds-var-m-left_xx-large" field-name='RF_CLIENT__c'>
                                    </lightning-input-field>
                                    <lightning-input-field variant="standard"
                                        class="slds-size_3-of-7 slds-var-m-right_xx-large" field-name='RF_SUPPLIER__c'>
                                    </lightning-input-field>
                                    <lightning-input-field variant="standard"
                                        class="slds-size_3-of-7 slds-var-m-left_xx-large" field-name='TX_POSITION__c'>
                                    </lightning-input-field>
                                    <lightning-input-field variant="standard"
                                        class="slds-size_3-of-7 slds-var-m-right_xx-large" field-name='NM_DEPART__c'>
                                    </lightning-input-field>
                                    <div style="visibility:hidden"><button class="fakesubmitContact"
                                            type="submit"></button></div>
                                    <!-- 
                                        <div class="slds-m-top_medium">
                                            <lightning-button variant="brand" type="submit" name="save" label="Create Contact">
                                            </lightning-button>
                                        </div> -->
                                </div>
                            </div>
                        </lightning-record-edit-form>
                    </div>
                    <footer class="slds-modal__footer">
                        <lightning-button label="キャンセル" variant="neutral" onclick={closeNewContact}></lightning-button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <lightning-button label="新規" variant="brand" onclick={newContactInEdit}></lightning-button>
                    </footer>
                </div>
            </section>
            <div class="slds-backdrop slds-backdrop_open"></div>
            <!-- </div> -->
        </template>
        <!-- new org user in edit mode -->
        <template if:true={neworguser}>
            <!-- <div class="demo-only" style="height: 640px;"> -->
            <section role="dialog" tabindex="-1" aria-labelledby="modal-heading-01" aria-modal="true"
                aria-describedby="modal-content-id-1"
                class="slds-modal slds-modal_medium fadeInDown TwoAnimated slds-fade-in-open">
                <div class="slds-modal__container">
                    <header class="slds-modal__header">
                        <button class="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse"
                            title="クローズ" onclick={closeNewOrgUser}>
                            <lightning-icon icon-name="utility:close" size="medium">
                            </lightning-icon>
                            <span class="slds-assistive-text">クローズ</span>
                        </button>
                        <h2 id="modal-heading-03" class="slds-text-heading_medium slds-hyphenate">アマナ案件担当者を新規</h2>
                    </header>
                    <div class="slds-modal__content slds-var-p-around_medium" id="modal-content-id-3">
                        <lightning-record-edit-form object-api-name="M_ORG_USER_MAP__c"
                            onsuccess={handleOrgUserSuccess}>
                            <lightning-messages></lightning-messages>
                            <div class="slds-grid slds-wrap">
                                <div class="slds-size_1-of-1 slds-var-m-horizontal_large slds-grid slds-wrap">
                                    <lightning-input-field variant="standard" required
                                        class="slds-size_3-of-7 slds-var-m-right_xx-large" field-name='Name'>
                                    </lightning-input-field>
                                    <lightning-input-field variant="standard"
                                        class="slds-size_3-of-7 slds-var-m-left_xx-large" field-name='RF_CLIENT__c'>
                                    </lightning-input-field>
                                    <lightning-input-field variant="standard"
                                        class="slds-size_3-of-7 slds-var-m-right_xx-large" field-name='RF_USER__c'>
                                    </lightning-input-field>
                                    <lightning-input-field variant="standard"
                                        class="slds-size_3-of-7 slds-var-m-left_xx-large"
                                        field-name='RF_ORGANIZATION__c'></lightning-input-field>
                                    <div style="visibility:hidden"><button class="fakesubmitOrgUser"
                                            type="submit"></button></div>
                                    <!-- 
                                        <div class="slds-m-top_medium">
                                            <lightning-button variant="brand" type="submit" name="save" label="Create Contact">
                                            </lightning-button>
                                        </div> -->
                                </div>
                            </div>
                        </lightning-record-edit-form>
                    </div>
                    <footer class="slds-modal__footer">
                        <lightning-button label="キャンセル" variant="neutral" onclick={closeNewOrgUser}></lightning-button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <lightning-button label="新規" variant="brand" onclick={newOrgUserInEdit}></lightning-button>
                    </footer>
                </div>
            </section>
            <div class="slds-backdrop slds-backdrop_open"></div>
            <!-- </div> -->
        </template>
        <template if:true={newsponsor}>
            <!-- <div class="demo-only" style="height: 640px;"> -->
            <section role="dialog" tabindex="-1" aria-labelledby="modal-heading-01" aria-modal="true"
                aria-describedby="modal-content-id-1"
                class="slds-modal slds-modal_medium fadeInDown TwoAnimated slds-fade-in-open">
                <div class="slds-modal__container">
                    <header class="slds-modal__header">
                        <button class="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse"
                            title="クローズ" onclick={closeNewSponsor}>
                            <lightning-icon icon-name="utility:close" size="medium">
                            </lightning-icon>
                            <span class="slds-assistive-text">クローズ</span>
                        </button>
                        <h2 id="modal-heading-04" class="slds-text-heading_medium slds-hyphenate">スポンサーを新規</h2>
                    </header>
                    <div class="slds-modal__content slds-var-p-around_medium" id="modal-content-id-4">
                        <lightning-record-edit-form object-api-name="M_COMPANY__c" record-type-id={sponsorType}
                            onsuccess={handleSponsorSuccess}>
                            <lightning-messages></lightning-messages>
                            <div class="slds-grid slds-wrap">
                                <div class="slds-size_1-of-1 slds-var-m-horizontal_large slds-grid slds-wrap">
                                    <lightning-input-field variant="standard" required
                                        class="slds-size_3-of-7 slds-var-m-right_xx-large" field-name='Name'>
                                    </lightning-input-field>
                                    <div style="visibility:hidden"><button class="fakesubmitSponsor"
                                            type="submit"></button></div>
                                    <!-- 
                                    <div class="slds-m-top_medium">
                                        <lightning-button variant="brand" type="submit" name="save" label="Create Contact">
                                        </lightning-button>
                                    </div> -->
                                </div>
                            </div>
                        </lightning-record-edit-form>
                    </div>
                    <footer class="slds-modal__footer">
                        <lightning-button label="キャンセル" variant="neutral" onclick={closeNewSponsor}></lightning-button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <lightning-button label="新規" variant="brand" onclick={newSponsorInEdit}></lightning-button>
                    </footer>
                </div>
            </section>
            <div class="slds-backdrop slds-backdrop_open"></div>
            <!-- </div> -->
        </template>
        <!-- </div> -->
    </div>
</template>