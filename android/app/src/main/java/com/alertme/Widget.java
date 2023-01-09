package com.alertme;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.widget.RemoteViews;

import android.content.SharedPreferences;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Implementation of App Widget functionality.
 */
public class Widget extends AppWidgetProvider {

    public static final String WIDGET_CLICK = "com.alertme.WIDGET_CLICK";

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {

//        try {
//            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
//            String stockString = sharedPref.getString("stockData", "{\"text\":'no data'}");
//            JSONObject stockData = new JSONObject(stockString);
//            // Construct the RemoteViews object
//            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget);
//            views.setTextViewText(R.id.appwidget_text, stockData.getString("text"));
//            views.setOnClickPendingIntent(R.id.button, getPendingSelfIntent(context, WIDGET_CLICK));// click listener
//            // Instruct the widget manager to update the widget
//            appWidgetManager.updateAppWidget(appWidgetId, views);
//        } catch (JSONException e) {
//            e.printStackTrace();
//        }
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {

        // There may be multiple widgets active, so update all of them
//        for (int appWidgetId : appWidgetIds) {
//            updateAppWidget(context, appWidgetManager, appWidgetId);
//        }

        for (int widgetId : appWidgetIds) {
//            Bundle options = appWidgetManager.getAppWidgetOptions(appWidgetId);
//            updateWidget(context, widgetId, remoteViews, appWidgetManager);


            Intent widgetAdapterIntent = new Intent(context, WidgetService.class);
            widgetAdapterIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, widgetId);
            widgetAdapterIntent.setData(Uri.parse(widgetAdapterIntent.toUri(Intent.URI_INTENT_SCHEME)));

            RemoteViews remoteViews = new RemoteViews(context.getPackageName(), R.layout.widget);
            remoteViews.setRemoteAdapter(R.id.list, widgetAdapterIntent);
            remoteViews.setEmptyView(R.id.list, R.id.no_data);

            appWidgetManager.updateAppWidget(widgetId, remoteViews);
            appWidgetManager.notifyAppWidgetViewDataChanged(widgetId, R.id.list);
        }
        super.onUpdate(context, appWidgetManager, appWidgetIds);
    }

    @Override
    public void onAppWidgetOptionsChanged(Context context, AppWidgetManager appWidgetManager, int widgetId, Bundle newOptions) {

        super.onAppWidgetOptionsChanged(context, appWidgetManager, widgetId, newOptions);
        RemoteViews remoteViews = new RemoteViews(context.getPackageName(), R.layout.widget);
//        updateWidget(context, widgetId, remoteViews, appWidgetManager);
        appWidgetManager.updateAppWidget(widgetId, remoteViews);
    }

    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
        super.onEnabled(context);
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
        super.onDisabled(context);
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        // TODO Auto-generated method stub
        super.onReceive(context, intent);

//        if (WIDGET_CLICK.equals(intent.getAction())) {
//
//            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
//
//            RemoteViews remoteViews;
//            ComponentName watchWidget;
//
//            remoteViews = new RemoteViews(context.getPackageName(), R.layout.widget);
//            watchWidget = new ComponentName(context, Widget.class);
//
//            remoteViews.setTextViewText(R.id.appwidget_text, "TESTING");
//
//            SharedPreferences.Editor editor = context.getSharedPreferences("DATA", Context.MODE_PRIVATE).edit();
//            editor.putString("widgetTrigger", "true");
//            editor.apply();
//
//            appWidgetManager.updateAppWidget(watchWidget, remoteViews);
//
//        }
    }

    protected static PendingIntent getPendingSelfIntent(Context context, String action) {
        Intent intent = new Intent(context, Widget.class);
        intent.setAction(action);
        return PendingIntent.getBroadcast(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
    }
}