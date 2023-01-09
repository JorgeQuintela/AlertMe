package com.alertme;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.text.TextUtils;
import android.widget.RemoteViews;
import android.widget.RemoteViewsService;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class GridRemoteViewsFactory implements RemoteViewsService.RemoteViewsFactory {

    private Context mContext;
    private Intent mIntent;

    private ArrayList<StockData> stocks = new ArrayList<>();

    public GridRemoteViewsFactory(Context context, Intent intent) {
        mContext = context;
        mIntent = intent;

        getSharedPreferencesData();
    }

    @Override
    public void onCreate() {
        getSharedPreferencesData();

    }

    @Override
    public void onDataSetChanged() {
        getSharedPreferencesData();
    }

    @Override
    public void onDestroy() {
        stocks.clear();
    }

    @Override
    public int getCount() {
        return stocks.size();
    }

    @Override
    public RemoteViews getViewAt(int position) {

        StockData itemByPositionData = stocks.get(position);

        RemoteViews remoteViews = new RemoteViews(mContext.getPackageName(), R.layout.widget_item);

        remoteViews.setTextViewText(R.id.ticker, itemByPositionData.getSymbol());
        remoteViews.setTextViewText(R.id.holdings, itemByPositionData.getCurrentPrice());
        remoteViews.setTextViewText(R.id.gain_loss, itemByPositionData.getPrctChangeSinceOpen());
        remoteViews.setTextViewText(R.id.gain_loss_percent, itemByPositionData.getTimestamp()+"");

        return remoteViews;
    }

    @Override
    public RemoteViews getLoadingView() {
        return null;
    }

    @Override
    public int getViewTypeCount() {
        return 1;
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public boolean hasStableIds() {
        return false;
    }

    public void getSharedPreferencesData () {
        try {
            SharedPreferences sharedPref = mContext.getSharedPreferences("DATA", Context.MODE_PRIVATE);
            String stockString = sharedPref.getString("stockData", "");
            stocks = convertReactJsonToAndroid(stockString);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public ArrayList<StockData> convertReactJsonToAndroid(String reactJsonStockData) {

        ArrayList<StockData> stocks = new ArrayList<>();

        if (!TextUtils.isEmpty(reactJsonStockData)) {
            try {
                JSONArray stockData = new JSONArray(reactJsonStockData);
                for (int i = 0; i < stockData.length(); i++) {
                    JSONObject item = stockData.getJSONObject(i);
                    StockData data = new StockData(
                            item.getString("symbol"),
                            item.getString("companyName"),
                            item.getString("currentPrice"),
                            item.getString("afterHoursPrice"),
                            item.getString("openPrice"),
                            item.getString("highPrice"),
                            item.getString("lowPrice"),
                            item.getString("prctChangeSinceOpen"),
                            item.getInt("timestamp"));

                    stocks.add(data);
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return stocks;
    }
}
