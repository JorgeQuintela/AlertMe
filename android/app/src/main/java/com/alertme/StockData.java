package com.alertme;

public class StockData {

    private String symbol;
    private String companyName;

    private String currentPrice;

    private String afterHoursPrice;
    private String openPrice;

    private String highPrice;
    private String lowPrice;

    private String prctChangeSinceOpen;

    private int timestamp;

    public StockData(String symbol, String companyName, String currentPrice, String afterHoursPrice, String openPrice, String highPrice, String lowPrice, String prctChangeSinceOpen, int timestamp) {
        this.symbol = symbol;
        this.companyName = companyName;
        this.currentPrice = currentPrice;
        this.afterHoursPrice = afterHoursPrice;
        this.openPrice = openPrice;
        this.highPrice = highPrice;
        this.lowPrice = lowPrice;
        this.prctChangeSinceOpen = prctChangeSinceOpen;
        this.timestamp = timestamp;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(String currentPrice) {
        this.currentPrice = currentPrice;
    }

    public String getAfterHoursPrice() {
        return afterHoursPrice;
    }

    public void setAfterHoursPrice(String afterHoursPrice) {
        this.afterHoursPrice = afterHoursPrice;
    }

    public String getOpenPrice() {
        return openPrice;
    }

    public void setOpenPrice(String openPrice) {
        this.openPrice = openPrice;
    }

    public String getHighPrice() {
        return highPrice;
    }

    public void setHighPrice(String highPrice) {
        this.highPrice = highPrice;
    }

    public String getLowPrice() {
        return lowPrice;
    }

    public void setLowPrice(String lowPrice) {
        this.lowPrice = lowPrice;
    }

    public String getPrctChangeSinceOpen() {
        return prctChangeSinceOpen;
    }

    public void setPrctChangeSinceOpen(String prctChangeSinceOpen) {
        this.prctChangeSinceOpen = prctChangeSinceOpen;
    }

    public int getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(int timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "StockData{" +
                "symbol='" + symbol + '\'' +
                ", companyName='" + companyName + '\'' +
                ", currentPrice='" + currentPrice + '\'' +
                ", afterHoursPrice='" + afterHoursPrice + '\'' +
                ", openPrice='" + openPrice + '\'' +
                ", highPrice='" + highPrice + '\'' +
                ", lowPrice='" + lowPrice + '\'' +
                ", prctChangeSinceOpen='" + prctChangeSinceOpen + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}
