package com.klavilinkdemorn

import android.content.ActivityNotFoundException
import android.content.Intent
import android.net.Uri
import android.util.Log
import androidx.core.view.ContentInfoCompat.Flags

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.net.URISyntaxException

class MyNativeModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "MyNativeModule"

    @ReactMethod
    fun launchApp(url: String) {
        Log.d("MyNativeModule", "launchApp: $url")
        val uri = Uri.parse(url)
        val context = reactApplicationContext
        try {
            val intent = if (uri.scheme == "intent") {
                Intent.parseUri(uri.toString(), Intent.URI_INTENT_SCHEME)
            } else {
                Intent(Intent.ACTION_VIEW, uri)
            }
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            context.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            e.printStackTrace()
        } catch (e: URISyntaxException) {
            e.printStackTrace()
        }
    }
}